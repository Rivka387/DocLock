using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DocLock.Core.DTOS;
using DocLock.Core.Entities;
using DocLock.Core.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace DocLock.Data.Repositories
{
    
        public class UserActivityRepository : IUserActivityRepository
        {
            private readonly DataContext _context;

            public UserActivityRepository(DataContext context)
            {
                _context = context;
            }

            public async Task LogActivityAsync(int userId, string actionType, int? fileId = null)
            {
                var log = new UserActivityLog
                {
                    UserId = userId,
                    ActionType = actionType,
                    FileId = fileId,
                    Timestamp = DateTime.UtcNow
                };

                await _context._UserActivityLogs.AddAsync(log);
                await _context.SaveChangesAsync();
            }


            public async Task<Dictionary<int, int>> GetUserMonthlyUsageAsync(int userId, int year, int month)
            {
                return await _context._UserActivityLogs
                    .Where(log => log.UserId == userId && log.Timestamp.Year == year && log.Timestamp.Month == month)
                    .GroupBy(log => log.Timestamp.Day)
                    .ToDictionaryAsync(g => g.Key, g => g.Count());
            }

            public async Task<Dictionary<int, int>> GetUserYearlyUsageAsync(int userId, int year)
            {
                return await _context._UserActivityLogs
                    .Where(log => log.UserId == userId && log.Timestamp.Year == year)
                    .GroupBy(log => log.Timestamp.Month)
                    .ToDictionaryAsync(g => g.Key, g => g.Count());
            }

            public async Task<Dictionary<int, int>> GetYearlyUsageAsync(int year)
            {
                return await _context._UserActivityLogs
                    .Where(log => log.Timestamp.Year == year)
                    .GroupBy(log => log.Timestamp.Month)
                    .ToDictionaryAsync(g => g.Key, g => g.Count());
            }

            public async Task<Dictionary<int, int>> GetMonthlyUsageAsync(int year, int month)
            {
                return await _context._UserActivityLogs
                    .Where(log => log.Timestamp.Year == year && log.Timestamp.Month == month)
                    .GroupBy(log => log.Timestamp.Day)
                    .ToDictionaryAsync(g => g.Key, g => g.Count());
            }
        }
    
}
