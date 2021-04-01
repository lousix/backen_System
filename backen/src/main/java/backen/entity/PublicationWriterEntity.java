package backen.entity;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.mapping.PrimaryKey;

import javax.persistence.*;
import java.io.Serializable;


/**
 * @author 刘智扬
 */

@Data
@Entity
@Table(name = "publication_writer")
@SQLDelete(sql="update publication_writer set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class PublicationWriterEntity implements Serializable {

    @Id
    @Column(name = "pid")
    private String pid;

    @Column(name = "id")
    private String id;

    @Column(name = "publication_id")
    private String publicationId;

    @Column(name = "type")
    private String type;

    @Column(name = "serial_number")
    private int number;

}
