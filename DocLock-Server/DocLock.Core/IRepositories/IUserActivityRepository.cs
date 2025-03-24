using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DocLock.Core.IRepositories
{

    public interface IUserActivityRepository
    {
        public Task LogActivityAsync(int userId, string actionType, int? fileId = null);

        public Task<Dictionary<int, int>> GetUserMonthlyUsageAsync(int userId, int year, int month);

        public Task<Dictionary<int, int>> GetUserYearlyUsageAsync(int userId, int year);

        public Task<Dictionary<int, int>> GetMonthlyUsageAsync(int year, int month);

        public Task<Dictionary<int, int>> GetYearlyUsageAsync(int year);
    }

}
