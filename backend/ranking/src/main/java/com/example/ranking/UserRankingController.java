package com.example.ranking;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/rankings")
@RequiredArgsConstructor
public class UserRankingController {
    @Autowired
    private UserRankingService userRankingService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserRanking> createUserRanking(@RequestBody UserRanking userRanking) {
        UserRanking savedRanking = userRankingService.createUserRanking(userRanking);
        return new ResponseEntity<>(savedRanking, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}/{careerId}")
    public ResponseEntity<UserRanking> getUserRanking(@PathVariable Long userId, @PathVariable Long careerId) {
        Optional<UserRanking> userRanking = userRankingService.getUserRanking(userId, careerId);
        return userRanking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{userId}/{careerId}")
    public ResponseEntity<UserRanking> updateUserRanking(@PathVariable Long userId, @PathVariable Long careerId, @RequestBody UserRanking userRanking) {
        try {
            userRanking.setId(new UserRankingId(userId, careerId));
            UserRanking updatedRanking = userRankingService.updateUserRanking(userRanking);
            return ResponseEntity.ok(updatedRanking);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/{careerId}")
    public ResponseEntity<Void> deleteUserRanking(@PathVariable Long userId, @PathVariable Long careerId) {
        try {
            userRankingService.deleteUserRanking(userId, careerId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
