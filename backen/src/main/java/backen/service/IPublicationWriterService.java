package backen.service;

import backen.entity.PublicationWriterEntity;

import java.util.List;

/**
 * @author 刘智扬
 */

public interface IPublicationWriterService {

    /**
     * 获取 publicationWriter 信息
     * @param
     * @return
     */
    List<PublicationWriterEntity> selectAll();

}
