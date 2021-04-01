package backen.service.impl;

import backen.entity.StudentEntity;
import backen.repository.StudentRepository;
import backen.service.IStudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 刘智扬
 */
@Service
public class StudentServiceImpl implements IStudentService {


    private StudentRepository studentRepository;

    @Autowired
    public StudentServiceImpl(StudentRepository studentRepository){
        this.studentRepository = studentRepository;
    }

    @Override
    public List<StudentEntity> selectAll() {
        return studentRepository.findAll();
    }

    @Override
    public StudentEntity selectById(String id) {
        return studentRepository.findById(id);
    }
}

