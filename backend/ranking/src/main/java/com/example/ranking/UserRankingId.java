package com.example.ranking;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserRankingId implements Serializable {
    private BigInteger userId;
    private Long careerId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserRankingId that = (UserRankingId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(careerId, that.careerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, careerId);
    }
}
