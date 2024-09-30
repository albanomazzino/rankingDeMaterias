package com.example.school.course;

import com.example.school.career.Career;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    // Find all courses by career ID
    public List<Course> findCoursesByCareerId(Long careerId) {
        return courseRepository.findByCareerId(careerId);
    }

    // Add courses to a career
    public void addCoursesToCareer(Career career, List<Course> courses) {
        courses.forEach(course -> course.setCareer(career));
        courseRepository.saveAll(courses);
    }
}

