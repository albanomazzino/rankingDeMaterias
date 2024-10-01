package com.example.ranking;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigInteger;
import java.util.*;


@Service
@Transactional
public class UserRankingService {

    @Autowired
    private UserRankingRepository userRankingRepository;

    public UserRanking createUserRanking(UserRanking userRanking) {
        UserRankingId userRankingId = userRanking.getId();
        BigInteger userId = userRankingId.getUserId();
        Long careerId = userRankingId.getCareerId();

        if (userRankingRepository.existsById_UserIdAndId_CareerId(userId, careerId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User ranking already exists for this user and career.");
        }

        try {
            return userRankingRepository.save(userRanking);
        } catch (Exception e) {
            System.out.println("Error saving UserRanking: " + e.getMessage());
            throw e;
        }
    }

    public Optional<UserRanking> getUserRanking(BigInteger userId, Long careerId) {
        UserRankingId id = new UserRankingId(userId, careerId);
        return userRankingRepository.findById(id);
    }

    public List<Object[]> getAllRankingsByCareer(Long careerId) {
        return userRankingRepository.findAllByCareerIdWithTotalScore(careerId);
    }

    public Map<Long, UserRankingDto> getAllRankingsByUser(BigInteger userId) {
        List<Object[]> rankings = userRankingRepository.findAllByUserId(userId);
        Map<Long, UserRankingDto> mappedRankings = new HashMap<>();

        for (Object[] ranking : rankings) {
            Long careerId = (Long) ranking[0];
            String courseName = (String) ranking[1];
            Integer position = (Integer) ranking[2];

            UserRankingDto userRanking = mappedRankings.computeIfAbsent(careerId, k -> new UserRankingDto(careerId, new ArrayList<>()));

            RankedCourseDto rankedCourse = new RankedCourseDto(courseName, position);
            userRanking.getRankedCourses().add(rankedCourse);
        }

        return mappedRankings;
    }


    public UserRanking updateUserRanking(UserRanking userRanking) {
        UserRankingId id = userRanking.getId();
        if (userRankingRepository.existsById(id)) {
            return userRankingRepository.save(userRanking);
        } else {
            throw new EntityNotFoundException("UserRanking not found for id: " + id);
        }
    }

    public void deleteUserRanking(BigInteger userId, Long careerId) {
        UserRankingId id = new UserRankingId(userId, careerId);
        if (userRankingRepository.existsById(id)) {
            userRankingRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("UserRanking not found for id: " + id);
        }
    }
}
