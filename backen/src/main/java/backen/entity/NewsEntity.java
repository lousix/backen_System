package backen.entity;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author 刘智扬
 */

@Data
@Entity
@Table(name = "news" )
@SQLDelete(sql="update news set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class NewsEntity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "date")
    private Date date;

    @Column(name = "description")
    private String description;

    @Column(name = "publication_id")
    private String publicationId;
}
