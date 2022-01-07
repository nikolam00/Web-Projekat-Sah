using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    public enum Titula
    {
        MK = 0,
        FM,
        IM,
        GM
    }

    [Table("Igrac")]
    public class Igrac
    {
        // Ovde pisemo propertije
        [Key]
        public int IgracID { get; set; }

        [MaxLength(6)]
        [Required]
        public int Fide { get; set; }

        [MaxLength(20)]
        [Required]
        public string Ime { get; set; }

        [MaxLength(20)]
        [Required]
        public string Prezime { get; set; }

        [Required]
        public DateTime Datum_rodjenja { get; set; }

        [Range(1200, 3000)]
        [Required]
        public int Rejting { get; set; }

        [Required]
        public Titula Titula { get; set; }

        [Required]
        public virtual Klub Klub { get; set; }
    }
}