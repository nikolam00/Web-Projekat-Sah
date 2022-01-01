using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    [Table("Turnir")]
    public class Turnir
    {
        // Ovde pisemo propertije
        [Key]
        public int TurnirID { get; set; }

        [MaxLength(50)]
        [Required]
        public string Naziv { get; set; }

        [JsonIgnore]
        [Required]
        public Klub Klub_organizator { get; set; }

        [Required]
        public DateTime Datum_pocetka { get; set; }


        [MaxLength(50)]
        [Required]
        public string Mesto { get; set; }

        [MaxLength(50)]
        [Required]
        public string Nagrada{ get; set; }

        [JsonIgnore]
        [Required]
        public Igrac Pobednik { get; set; }



    }
}