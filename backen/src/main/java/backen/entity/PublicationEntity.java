package backen.entity;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;
import java.time.Year;

/**
 * @author 刘智扬
 */

@Data
@Entity
@Table(name = "publication")
@SQLDelete(sql="update publication set is_delete = 1 where id = ?")
@Where(clause = "is_delete = 0")
public class PublicationEntity implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "platform")
    private String platform;

    @Column(name = "platform_link")
    private String platform_link;

    @Column(name = "pdf_path")
    private String pdf_path;

    @Column(name = "note")
    private String note;

    @Column(name = "year")
    private String year;

    @Column(name = "type")
    private String type;

    @Column(name = "is_selected")
    private String is_selected;
}
