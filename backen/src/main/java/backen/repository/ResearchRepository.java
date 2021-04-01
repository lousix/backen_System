package backen.repository;

import backen.entity.ResearchEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author 刘智扬
 */

@Repository
public interface ResearchRepository extends JpaRepository<ResearchEntity,Long> {

    /**
     * 通过 id 查找一条 research 信息
     * @param id
     * @return
     */
    ResearchEntity findById(String id);


}
