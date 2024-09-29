package com.example.ranking;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ranked_courses")
public class RankedCourse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumns({
            @JoinColumn(name = "user_id", referencedColumnName = "userId", insertable = true, updatable = false),
            @JoinColumn(name = "career_id", referencedColumnName = "careerId", insertable = true, updatable = false)
    })
    @JsonBackReference
    private UserRanking userRanking;

    @Column(name = "position", nullable = false)
    private Integer position;

    @Column(name = "course_name", nullable = false)
    private String courseName;
}


