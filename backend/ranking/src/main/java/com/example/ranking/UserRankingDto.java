package com.example.ranking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserRankingDto {
    private Long careerId;
    private List<RankedCourseDto> rankedCourses;
}
