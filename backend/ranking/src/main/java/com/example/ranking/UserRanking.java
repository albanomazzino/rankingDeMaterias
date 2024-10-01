package com.example.ranking;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_rankings")
public class UserRanking {

    @EmbeddedId
    private UserRankingId id;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "userRanking", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<RankedCourse> rankedCourses = new ArrayList<>();

    @Column(updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime lastModifiedAt;
}
