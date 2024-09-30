package com.example.school.career;

import com.example.school.course.Course;
import com.example.school.course.CourseService;
import com.example.school.school.School;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerService {
    private final CareerRepository careerRepository;
    private final CourseService courseService;

    public List<Career> findCareersBySchoolId(Long schoolId) {
        return careerRepository.findBySchoolId(schoolId);
    }

    public void addCareerToSchool(School school, Career career) {
        career.setSchool(school);
        careerRepository.save(career);
    }

    public List<Course> findCoursesByCareerId(Long careerId) {
        return courseService.findCoursesByCareerId(careerId);
    }
}

