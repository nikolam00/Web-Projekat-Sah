using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Models
{
    public enum Kategorija
    {
        NA = 0,
        IA
    }

    [Table("Sudija")]
    public class Sudija
    {
        [Key]
        public int SudijaID { get; set; }

        [MaxLength(20)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(20)]
        [Required]
        public string Prezime { get; set; }

        public Kategorija Kategorija { get; set; }
        
        [JsonIgnore]
        public List<Turnir> Sudjeni_turniri { get; set; }

    }
}