package backen.service;

import backen.entity.StudentEntity;

import java.util.List;

/**
 * @author 刘智扬
 */

public interface IStudentService {

    /**
     * 获取 student 信息
     * @param
     * @return
     */
    List<StudentEntity> selectAll();

    StudentEntity selectById(String id);
}

