package backen.service;

import backen.entity.TeacherEntity;

import java.util.List;

/**
 * @author 刘智扬
 */

public interface ITeacherService {

    /**
     * 获取 teacher 信息
     * @param
     * @return
     */
    List<TeacherEntity> selectAll();

    TeacherEntity getById(String id);

}
