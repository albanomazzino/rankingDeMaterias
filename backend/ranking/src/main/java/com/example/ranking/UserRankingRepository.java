package com.example.ranking;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface UserRankingRepository extends JpaRepository<UserRanking, UserRankingId> {

    @Query("SELECT rc.courseName, SUM(rc.position) as totalScore, COUNT(rc) as timesRanked " +
            "FROM UserRanking ur JOIN ur.rankedCourses rc " +
            "WHERE ur.id.careerId = :careerId " +
            "GROUP BY rc.courseName")
    List<Object[]> findAllByCareerIdWithTotalScore(Long careerId);

    @Query("SELECT ur.id.careerId, rc.courseName, rc.position " +
            "FROM UserRanking ur " +
            "JOIN ur.rankedCourses rc " +
            "WHERE ur.id.userId = :userId")
    List<Object[]> findAllByUserId(BigInteger userId);


    boolean existsById_UserIdAndId_CareerId(BigInteger userId, Long careerId);
}
