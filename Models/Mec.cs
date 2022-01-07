using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
    public enum Rezultat
    {
        Pobeda_Beli=0,
        Nereseno,
        Pobeda_Crni
    }

    [Table("Mec")]
    public class Mec
    {
        // Ovde pisemo propertije
        [Key]
        public int MecID { get; set; }

        [Required]
        public Turnir Turnir { get; set; }

        [Required]
        public int Kolo { get; set; }
        
        [Required]
        public Igrac Beli { get; set; }
        
        [Required]
        public Igrac Crni { get; set; }

        public Rezultat Result { get; set; }
    }
}