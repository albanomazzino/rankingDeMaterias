package com.example.ranking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class RankedCourseDto {
    private String courseName;
    private Integer position;
}
