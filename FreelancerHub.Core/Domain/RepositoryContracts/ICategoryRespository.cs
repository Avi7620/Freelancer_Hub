using FreelancerHub.Core.Domain.Entities;

public interface ICategoryRepository
{

    Task<List<string>> GetCategoriesByFreelancerIdAsync(Guid freelancerId);
    Task<List<Category>> GetAllAsync();
    Task<Category?> GetByIdAsync(Guid id);
    Task UpdateAsync(Category category);
    Task DeleteAsync(Guid id);

    // For adding multiple categories at once
    Task AddCategoriesAsync(Guid freelancerId, List<string> categoryNames);

    // For adding a single category
    Task AddCategoryAsync(Guid freelancerId, Category category);
}