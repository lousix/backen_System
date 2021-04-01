package backen.service;

import backen.entity.ProjectEntity;

import java.util.List;

/**
 * @author 刘智扬
 */
public interface IProjectService {

    List<List<ProjectEntity>> selectAll();

    ProjectEntity getById(String id);
}
