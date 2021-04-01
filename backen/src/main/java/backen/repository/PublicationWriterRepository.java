package backen.repository;

import backen.entity.PublicationEntity;
import backen.entity.PublicationWriterEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 刘智扬
 */

@Repository
public interface PublicationWriterRepository extends JpaRepository<PublicationWriterEntity,Long> {

    /**
     * 通过 id 寻找 publicationWriter 的信息
     * @param id
     * @return
     */
    List<PublicationWriterEntity> findAllByPublicationIdOrderByNumberAsc(String id);


    /**
     * 通过 id 寻找 publicationWriter 的信息
     * @param id
     * @return
     */
    @Query("select p from PublicationWriterEntity p where p.publicationId = :id order by p.number ASC ")
    List<PublicationWriterEntity> findAllId(@Param("id") String id);


}
