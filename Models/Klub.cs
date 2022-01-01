using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    [Table("Klub")]
    public class Klub
    {
        // Ovde pisemo propertije
        [Key]
        public int KlubID { get; set; }

        [MaxLength(50)]
        [Required]
        public string Naziv { get; set; }

        [MaxLength(50)]
        [Required]
        public string Mesto { get; set; }

        [MaxLength(20)]
        public string Broj_Telefona { get; set; }

        public int Broj_Igraca { get; set; }

        [JsonIgnore]
        public List<Igrac> Igraci { get; set;}

    }
}