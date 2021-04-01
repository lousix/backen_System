package backen.service.impl;

import backen.entity.PublicationEntity;
import backen.entity.PublicationWriterEntity;
import backen.entity.RPublicationEntity;
import backen.repository.PublicationRepository;
import backen.repository.PublicationWriterRepository;
import backen.repository.StudentRepository;
import backen.repository.TeacherRepository;
import backen.service.IPublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.ArrayList;
import java.util.List;

/**
 * @author 刘智扬
 */
@Service
public class PublicationServiceImpl implements IPublicationService {

    private PublicationRepository publicationRepository;
    private PublicationWriterRepository publicationWriterRepository;
    private StudentRepository studentRepository;
    private TeacherRepository teacherRepository;

    @Autowired
    public PublicationServiceImpl(PublicationRepository publicationRepository,PublicationWriterRepository publicationWriterRepository,
                                  StudentRepository studentRepository,TeacherRepository teacherRepository){
        this.publicationRepository = publicationRepository;
        this.publicationWriterRepository = publicationWriterRepository;
        this.studentRepository = studentRepository;
        this.teacherRepository = teacherRepository;
    }


    @Override
    public List<List<RPublicationEntity>> selectAll(int select, int method, String range) {
        List<List<RPublicationEntity>> result = new ArrayList<List<RPublicationEntity>>();
        //需要按时间返回
        String status = "all";
        if(method == 0){
            if(status.equals(range)){
                List<String> time = new ArrayList<String>();
                time = publicationRepository.findAllYear();
                for (String t:time){
                    List<RPublicationEntity> rPublicationEntities = new ArrayList<RPublicationEntity>();
                    List<PublicationEntity> entities = new ArrayList<PublicationEntity>();
                    entities = publicationRepository.findByYear(t);
                    for(PublicationEntity entity:entities){
                        if(select <= Integer.parseInt(entity.getIs_selected())){
                            String author = "";
                            List<PublicationWriterEntity> publicationWriterEntities = publicationWriterRepository.findAllId(entity.getId());
                            for (PublicationWriterEntity entity1:publicationWriterEntities){
                                String id = entity1.getId();
                                String type = entity1.getType();
                                if("学生".equals(type)){
                                    author += studentRepository.findById(id).getName()+",";
                                }
                                else if ("教师".equals(type)){
                                    author += teacherRepository.findById(id).getName()+",";
                                }
                            }

                            RPublicationEntity rPublicationEntity = new RPublicationEntity(entity,author);
                            rPublicationEntities.add(rPublicationEntity);
                        }
                    }
                    if(rPublicationEntities.isEmpty()) {
                        continue;
                    }
                    result.add(rPublicationEntities);
                }
            }else{
                List<RPublicationEntity> rPublicationEntities = new ArrayList<RPublicationEntity>();
                List<PublicationEntity> entities = new ArrayList<PublicationEntity>();
                entities = publicationRepository.findByYear(range);
                for(PublicationEntity entity:entities){
                    if(select <= Integer.parseInt(entity.getIs_selected())){
                        String author = "";
                        List<PublicationWriterEntity> publicationWriterEntities = publicationWriterRepository.findAllByPublicationIdOrderByNumberAsc(entity.getId());
                        for (PublicationWriterEntity entity1:publicationWriterEntities){
                            String id = entity1.getId();
                            String type = entity1.getType();
                            if("学生".equals(type)){
                                author += studentRepository.findById(id).getName()+",";
                            }
                            else if ("教师".equals(type)){
                                author += teacherRepository.findById(id).getName()+",";
                            }
                        }
                        RPublicationEntity rPublicationEntity = new RPublicationEntity(entity,author);
                        rPublicationEntities.add(rPublicationEntity);
                    }
                }
                if(rPublicationEntities.isEmpty()) {
                    return null;
                }
                result.add(rPublicationEntities);
            }
        }
        else{
            if(status.equals(range)){
                List<String> type = new ArrayList<String>();
                type = publicationRepository.findAllType();
                for (String t:type){
                    List<RPublicationEntity> rPublicationEntities = new ArrayList<RPublicationEntity>();
                    List<PublicationEntity> entities = new ArrayList<PublicationEntity>();
                    entities = publicationRepository.findByTypeOrderByYearDesc(t);
                    for(PublicationEntity entity:entities){
                        if(select <= Integer.parseInt(entity.getIs_selected())){
                            String author = "";
                            List<PublicationWriterEntity> publicationWriterEntities = publicationWriterRepository.findAllByPublicationIdOrderByNumberAsc(entity.getId());
                            for (PublicationWriterEntity entity1:publicationWriterEntities){
                                String id = entity1.getId();
                                String type1 = entity1.getType();
                                if("学生".equals(type1)){
                                    author += studentRepository.findById(id).getName()+",";
                                }
                                else if ("教师".equals(type1)){
                                    author += teacherRepository.findById(id).getName()+",";
                                }
                            }
                            RPublicationEntity rPublicationEntity = new RPublicationEntity(entity,author);
                            rPublicationEntities.add(rPublicationEntity);
                        }
                    }
                    if(rPublicationEntities.isEmpty()) {
                        continue;
                    }
                    result.add(rPublicationEntities);
                }
            }else{
                List<RPublicationEntity> rPublicationEntities = new ArrayList<RPublicationEntity>();
                List<PublicationEntity> entities = new ArrayList<PublicationEntity>();
                entities = publicationRepository.findByTypeOrderByYearDesc(range);
                for(PublicationEntity entity:entities){
                    if(select <= Integer.parseInt(entity.getIs_selected())){
                        String author = "";
                        List<PublicationWriterEntity> publicationWriterEntities = publicationWriterRepository.findAllByPublicationIdOrderByNumberAsc(entity.getId());
                        for (PublicationWriterEntity entity1:publicationWriterEntities){
                            String id = entity1.getId();
                            String type = entity1.getType();
                            if("学生".equals(type)){
                                author += studentRepository.findById(id).getName()+",";
                            }
                            else if ("教师".equals(type)){
                                author += teacherRepository.findById(id).getName()+",";
                            }
                        }
                        RPublicationEntity rPublicationEntity = new RPublicationEntity(entity,author);
                        rPublicationEntities.add(rPublicationEntity);
                    }
                }
                if(rPublicationEntities.isEmpty()) {
                    return null;
                }
                result.add(rPublicationEntities);
            }
        }
        return result;
    }

    @Override
    public PublicationEntity selectById(String id) {
        return publicationRepository.findById(id);
    }
}

