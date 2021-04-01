package backen.service.impl;

import backen.entity.ProjectEntity;
import backen.repository.ProjectRepository;
import backen.service.IProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 刘智扬
 */
@Service
public class ProjectServiceImpl implements IProjectService {

    private ProjectRepository projectRepository;

    @Autowired
    public ProjectServiceImpl(ProjectRepository projectRepository){
        this.projectRepository = projectRepository;
    }

    @Override
    public List<List<ProjectEntity>> selectAll() {
        List<String> type = projectRepository.findType();
        List<List<ProjectEntity>> entities = new ArrayList<List<ProjectEntity>>();

        for(String t:type){
            entities.add(projectRepository.findByType(t));
        }

        return entities;
    }

    @Override
    public ProjectEntity getById(String id) {
        return projectRepository.findById(id);
    }
}
