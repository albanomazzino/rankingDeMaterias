package com.example.school.school;

import com.example.school.career.Career;
import com.example.school.course.Course;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/schools")
@RequiredArgsConstructor
public class SchoolController {
    private final SchoolService schoolService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void save(@RequestBody School school) {
        schoolService.saveSchool(school);
    }

    @GetMapping
    public ResponseEntity<List<SchoolDTO>> findAllSchools(){
        return ResponseEntity.ok(schoolService.findAllSchools());
    }

    @GetMapping("/{school-id}/careers")
    public ResponseEntity<List<Career>> findCareersBySchoolId(@PathVariable("school-id") Long schoolId) {
        return ResponseEntity.ok(schoolService.findCareersBySchoolId(schoolId));
    }

    @PostMapping("/{school-id}/careers")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCareerToSchool(@PathVariable("school-id") Long schoolId, @RequestBody Career career) {
        schoolService.addCareerToSchool(schoolId, career);
    }

    @GetMapping("/careers/{career-id}/courses")
    public ResponseEntity<List<Course>> findCoursesByCareerId(@PathVariable("career-id") Long careerId) {
        return ResponseEntity.ok(schoolService.findCoursesByCareerId(careerId));
    }

    @GetMapping("/with-users/{school-id}")
    public ResponseEntity<FullSchoolResponse> findSchoolWithUsers(@PathVariable("school-id") Long schoolId, @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(schoolService.findAllSchoolsWithUsers(schoolId, token));
    }
}
