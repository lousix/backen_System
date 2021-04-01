package backen.service.impl;

import backen.entity.ResearchEntity;
import backen.entity.SoftwareEntity;
import backen.repository.SoftwareRepository;
import backen.repository.TeacherRepository;
import backen.service.ISoftwareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 刘智扬
 */
@Service
public class SoftwareServiceImpl implements ISoftwareService {

    private SoftwareRepository softwareRepository;

    @Autowired
    public SoftwareServiceImpl(SoftwareRepository softwareRepository){
        this.softwareRepository = softwareRepository;
    }

    @Override
    public List<SoftwareEntity> selectAll() {
        return softwareRepository.findAll();
    }

}
