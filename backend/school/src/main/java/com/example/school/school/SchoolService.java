package com.example.school.school;

import com.example.school.career.Career;
import com.example.school.career.CareerRepository;
import com.example.school.career.CareerService;
import com.example.school.client.UserClient;
import com.example.school.course.Course;
import com.example.school.course.CourseRepository;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SchoolService {
    private final SchoolRepository schoolRepository;
    private final CareerService careerService;
    private final UserClient userClient;

    public void saveSchool(School school){
        schoolRepository.save(school);
    }

    public List<SchoolDTO> findAllSchools() {
        List<School> schools = schoolRepository.findAll();
        return convertSchoolsToSchoolDTOs(schools);
    }


    public School findSchoolById(Long id) {
        return schoolRepository.findById(id).orElseThrow(() -> new RuntimeException("School not found"));
    }

    public List<Career> findCareersBySchoolId(Long schoolId) {
        findSchoolById(schoolId);
        return careerService.findCareersBySchoolId(schoolId);
    }

    public void addCareerToSchool(Long schoolId, Career career) {
        School school = findSchoolById(schoolId);
        careerService.addCareerToSchool(school, career);
    }

    public FullSchoolResponse findAllSchoolsWithUsers(Long schoolId, String token) {
        School school = schoolRepository.findById(schoolId).orElseThrow(() -> new NotFoundException("School with id " + schoolId + " not found"));
        var users = userClient.findAllUsersBySchoolId(schoolId, token);

        return FullSchoolResponse.builder()
            .name(school.getName())
            .address(school.getAddress())
            .schoolUsers(users)
            .build();
    }

    public List<Course> findCoursesByCareerId(Long careerId) {
        return careerService.findCoursesByCareerId(careerId);
    }

    private List<SchoolDTO> convertSchoolsToSchoolDTOs(List<School> schools) {
        return schools.stream()
                .map(school -> SchoolDTO.builder()
                        .id(school.getId())
                        .name(school.getName())
                        .build())
                .collect(Collectors.toList());
    }


    @Transactional
    public void populateDatabase() {
        School schoolExample1 = School.builder()
                .name("Universidad Nacional del Sur")
                .address("Bahía Blanca, Buenos Aires")
                .build();

        School schoolExample2 = School.builder()
                .name("Universidad Nacional de La Plata")
                .address("La Plata, Buenos Aires")
                .build();

        Career systemsEngineering = Career.builder()
                .name("Ingeniería en Sistemas de Información")
                .school(schoolExample1)
                .build();

        List<Course> courses = List.of(
            Course.builder().name("Análisis Matemático I").career(systemsEngineering).build(),
            Course.builder().name("Sistemas Operativos").career(systemsEngineering).build(),
            Course.builder().name("Arquitectura y Diseño de Sistemas").career(systemsEngineering).build(),
            Course.builder().name("Estructuras de Datos").career(systemsEngineering).build(),
            Course.builder().name("Requerimientos de Sistemas").career(systemsEngineering).build(),
            Course.builder().name("Ingeniería de Aplicaciones de Web").career(systemsEngineering).build(),
            Course.builder().name("Lenguajes Formales y Autómatas").career(systemsEngineering).build(),
            Course.builder().name("Algoritmos y complejidad").career(systemsEngineering).build(),
            Course.builder().name("Lógica para Ciencias de la Computación").career(systemsEngineering).build(),
            Course.builder().name("Tecnología de Programación").career(systemsEngineering).build(),
            Course.builder().name("Teoría de la Computabilidad").career(systemsEngineering).build(),
            Course.builder().name("Bases de Datos").career(systemsEngineering).build(),
            Course.builder().name("Elementos de Álgebra y Geometría").career(systemsEngineering).build(),
            Course.builder().name("Introducción a la Programación Orientada a Objetos").career(systemsEngineering).build(),
            Course.builder().name("Redes de Computadoras").career(systemsEngineering).build(),
            Course.builder().name("Resolución de Problemas y Algoritmos").career(systemsEngineering).build(),
            Course.builder().name("Métodos Formales para Ingeniería de Software").career(systemsEngineering).build(),
            Course.builder().name("Modelos de Software").career(systemsEngineering).build(),
            Course.builder().name("Gestión de Calidad en el Software").career(systemsEngineering).build(),
            Course.builder().name("Verificación y Validación de Software").career(systemsEngineering).build(),
            Course.builder().name("Organización de Computadoras").career(systemsEngineering).build(),
            Course.builder().name("Proyectos de Sistemas de Software").career(systemsEngineering).build(),
            Course.builder().name("Introducción a la Ingeniería de Software").career(systemsEngineering).build(),
            Course.builder().name("Modelos Estadísticos para Ciencias de la Computación").career(systemsEngineering).build(),
            Course.builder().name("Arquitectura de Computadoras").career(systemsEngineering).build(),
            Course.builder().name("Química IS").career(systemsEngineering).build(),
            Course.builder().name("Economía De La Empresa ISS").career(systemsEngineering).build(),
            Course.builder().name("Análisis Matemático II").career(systemsEngineering).build(),
            Course.builder().name("Física II IS").career(systemsEngineering).build(),
            Course.builder().name("Práctica Profesional Supervisada para Ingeniería de Software").career(systemsEngineering).build(),
            Course.builder().name("Proyecto Final").career(systemsEngineering).build(),
            Course.builder().name("Auditoría de Sistemas").career(systemsEngineering).build(),
            Course.builder().name("Sistemas Inteligentes Artificiales").career(systemsEngineering).build(),
            Course.builder().name("Fisica I").career(systemsEngineering).build()
        );

        systemsEngineering.setCourses(courses);

        schoolExample1.setCareers(List.of(systemsEngineering));

        schoolRepository.saveAll(List.of(schoolExample1, schoolExample2));
    }
}
