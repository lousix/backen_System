package backen.service.impl;

import backen.entity.ResearchEntity;
import backen.repository.ResearchRepository;
import backen.service.IResearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 刘智扬
 */
@Service
public class ResearchServiceImpl implements IResearchService {

    private ResearchRepository researchRepository;
    @Autowired
    public ResearchServiceImpl(ResearchRepository researchRepository){
        this.researchRepository = researchRepository;
    }

    @Override
    public List<ResearchEntity> selectAll() {
        return researchRepository.findAll();
    }

    @Override
    public ResearchEntity getById(String id) {
        return researchRepository.findById(id);
    }
}
