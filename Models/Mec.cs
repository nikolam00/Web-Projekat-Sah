using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using System;

namespace Models
{
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

        [JsonIgnore]
        [Required]
        public Igrac Beli {get; set;}
        
        [JsonIgnore]
        [Required]
        public Igrac Crni {get; set;}
    }
}