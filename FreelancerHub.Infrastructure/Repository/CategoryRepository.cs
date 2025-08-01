using FreelancerHub.Core.Domain.Entities;
using FreelancerHub.Core.Domain.RepositoryContracts;
using FreelancerHub.Infrastructure.DbContext;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace FreelancerHub.Infrastructure.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddCategoriesAsync(Guid freelancerId, List<string> categoryNames)
        {
            if (categoryNames == null || !categoryNames.Any())
                return;

            // First, delete any existing categories for this freelancer
            var existingCategories = await _context.Categories
                .Where(c => c.FreelancerId == freelancerId)
                .ToListAsync();

            if (existingCategories.Any())
            {
                _context.Categories.RemoveRange(existingCategories);
                await _context.SaveChangesAsync();
            }

            // Process each category input
            var categoriesToAdd = new List<Category>();

            foreach (var input in categoryNames)
            {
                if (string.IsNullOrWhiteSpace(input))
                    continue;

                // Handle both JSON arrays and plain strings
                if (input.Trim().StartsWith("["))
                {
                    // Manually parse the array without JSON deserialization
                    var cleaned = input.Trim('[', ']', ' ', '"');
                    var categories = cleaned.Split(new[] { "\",\"", "\", \"", "," },
                        StringSplitOptions.RemoveEmptyEntries);

                    foreach (var category in categories)
                    {
                        if (!string.IsNullOrWhiteSpace(category))
                        {
                            categoriesToAdd.Add(new Category
                            {
                                Id = Guid.NewGuid(),
                                FreelancerId = freelancerId,
                                CategoryName = category.Trim(' ', '"')
                            });
                        }
                    }
                }
                else
                {
                    // Single category
                    categoriesToAdd.Add(new Category
                    {
                        Id = Guid.NewGuid(),
                        FreelancerId = freelancerId,
                        CategoryName = input.Trim()
                    });
                }
            }

            // Add all new categories
            await _context.Categories.AddRangeAsync(categoriesToAdd);
            await _context.SaveChangesAsync();
        }

        public async Task<List<string>> GetCategoriesByFreelancerIdAsync(Guid freelancerId)
        {
            return await _context.Categories
                .Where(c => c.FreelancerId == freelancerId)
                .Select(c => c.CategoryName)
                .ToListAsync();
        }

        // Implement other interface methods as needed
        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<Category?> GetByIdAsync(Guid id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task UpdateAsync(Category category)
        {
            _context.Categories.Update(category);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category != null)
            {
                _context.Categories.Remove(category);
                await _context.SaveChangesAsync();
            }
        }

        public Task AddCategoryAsync(Guid freelancerId, Category category)
        {
            throw new NotImplementedException();
        }
    }
}