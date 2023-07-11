using IcmOdivelas.WebAPI.Model;
using Microsoft.EntityFrameworkCore;

namespace IcmOdivelas.WebAPI.Data
{
    public class DataContext : DbContext
    { 
        public DataContext() { }
        public DataContext(DbContextOptions options) : base(options) { }        

        public DbSet<Member> Members { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<MemberRole> MemberRoles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Situation> Situations { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MemberRole>()
             .HasKey(mf => new { mf.MemberId, mf.RoleId });

            modelBuilder.Entity<Member>()
            .HasMany(e => e.Roles)
            .WithMany(e => e.Members)
            .UsingEntity<MemberRole>();

            modelBuilder.Entity<Role>()
              .HasMany(e => e.Members)
              .WithMany(e => e.Roles)
              .UsingEntity<MemberRole>();

            modelBuilder.Entity<Member>()
                .HasOne(m => m.Category)
                .WithMany(c => c.Members)
                .HasForeignKey(m => m.CategoryId);

            modelBuilder.Entity<Member>()
                .HasOne(m => m.Group)
                .WithMany(g => g.Members)
                .HasForeignKey(m => m.GroupId);

            modelBuilder.Entity<Member>()
                .HasOne(m => m.Situation)
                .WithMany(s => s.Members)
                .HasForeignKey(m => m.SituationId);

        }
    }
}