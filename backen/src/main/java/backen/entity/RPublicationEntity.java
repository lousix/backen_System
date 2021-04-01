package backen.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.io.Serializable;

/**
 * @author 刘智扬
 */
@Data
public class RPublicationEntity implements Serializable {

    public RPublicationEntity(PublicationEntity publicationEntity,String author){
        id = publicationEntity.getId();
        name = publicationEntity.getName();
        platform = publicationEntity.getPlatform();
        platform_link = publicationEntity.getPlatform_link();
        pdf_path = publicationEntity.getPdf_path();
        note = publicationEntity.getNote();
        year = publicationEntity.getYear();
        type = publicationEntity.getType();
        this.author = author;
    }

    private String id;
    private String name;
    private String platform;
    private String platform_link;
    private String pdf_path;
    private String note;
    private String year;
    private String type;
    private String is_selected;
    private String author;

}
