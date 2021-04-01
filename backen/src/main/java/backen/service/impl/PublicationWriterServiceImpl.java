package backen.service.impl;

import backen.entity.PublicationWriterEntity;
import backen.repository.PublicationWriterRepository;
import backen.repository.ResearchRepository;
import backen.service.IPublicationWriterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author 刘智扬
 */
@Service
public class PublicationWriterServiceImpl implements IPublicationWriterService {

    private PublicationWriterRepository publicationWriterRepository;

    @Autowired
    public PublicationWriterServiceImpl(PublicationWriterRepository publicationWriterRepository){
        this.publicationWriterRepository = publicationWriterRepository;
    }

    @Override
    public List<PublicationWriterEntity> selectAll() {
        return publicationWriterRepository.findAll();
    }

}
