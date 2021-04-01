package backen.repository;

import backen.entity.PublicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author 刘智扬
 */

@Repository
public interface PublicationRepository extends JpaRepository<PublicationEntity,Long> {

    /**
     * 通过 id 查找一条 publication 信息
     * @param id
     * @return
     */
    PublicationEntity findById(String id);


    /**
     * 更新 publication 信息
     * @param
     * @return
     */
    @Query("select p.type from PublicationEntity p group by p.type")
    List<String> findAllType();

    /**
     * 更新 publication 信息
     * @param
     * @return
     */
    @Query("select p.year from PublicationEntity p group by p.year order by p.year desc")
    List<String> findAllYear();

    /**
     * 更新 publication 信息
     * @param year
     * @return
     */
    List<PublicationEntity> findByYear(String year);

    /**
     * 更新 publication 信息
     * @param type
     * @return
     */
    List<PublicationEntity> findByTypeOrderByYearDesc(String type);
}

