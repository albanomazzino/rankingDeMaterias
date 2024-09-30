package com.example.school.career;

import com.example.school.course.Course;
import com.example.school.school.School;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "careers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Career {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "school_id", nullable = false)
    private School school;

    @JsonManagedReference
    @OneToMany(mappedBy = "career", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Course> courses;
}
