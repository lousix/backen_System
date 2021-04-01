package backen.service.impl;

import backen.entity.TeacherEntity;
import backen.repository.StudentRepository;
import backen.repository.TeacherRepository;
import backen.service.ITeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.function.IntToDoubleFunction;

/**
 * @author 刘智扬
 */
@Service
public class TeacherServiceImpl implements ITeacherService {

    private TeacherRepository teacherRepository;

    @Autowired
    public TeacherServiceImpl(TeacherRepository teacherRepository){
        this.teacherRepository = teacherRepository;
    }

    @Override
    public List<TeacherEntity> selectAll() {
        return teacherRepository.findAll();
    }


    @Override
    public TeacherEntity getById(String id) {
        return teacherRepository.findById(id);
    }
}
