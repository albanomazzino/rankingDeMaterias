package com.example.ranking;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
public class UserRankingService {

    @Autowired
    private UserRankingRepository userRankingRepository;

    public UserRanking createUserRanking(UserRanking userRanking) {
        try {
            return userRankingRepository.save(userRanking);
        } catch (Exception e) {
            System.out.println("Error saving UserRanking: " + e.getMessage());
            throw e;
        }
    }

    public Optional<UserRanking> getUserRanking(Long userId, Long careerId) {
        UserRankingId id = new UserRankingId(userId, careerId);
        return userRankingRepository.findById(id);
    }

    public UserRanking updateUserRanking(UserRanking userRanking) {
        UserRankingId id = userRanking.getId();
        if (userRankingRepository.existsById(id)) {
            return userRankingRepository.save(userRanking);
        } else {
            throw new EntityNotFoundException("UserRanking not found for id: " + id);
        }
    }

    public void deleteUserRanking(Long userId, Long careerId) {
        UserRankingId id = new UserRankingId(userId, careerId);
        if (userRankingRepository.existsById(id)) {
            userRankingRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("UserRanking not found for id: " + id);
        }
    }
}
