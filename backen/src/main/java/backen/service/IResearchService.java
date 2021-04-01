package backen.service;

import backen.entity.ResearchEntity;

import java.util.List;

/**
 * @author 刘智扬
 */

public interface IResearchService {

    /**
     * 获取 research 信息
     * @param
     * @return
     */
    List<ResearchEntity> selectAll();

    ResearchEntity getById(String id);

}
