using System;
using System.Diagnostics;
using System.Net.Http;
using System.Threading.Tasks;

namespace DatabaseApp
{
    class APIMetrics
    {
        private Stopwatch _watch;

        /// <summary>
        /// Initializes a new instance of the helper class to call APIs for performance testing
        /// </summary>
        public APIMetrics()
        {
            _watch = new Stopwatch();
        }

        /// <summary>
        /// Fetches data from an API in quantity intervals of 10 up to 1000
        /// </summary>
        /// <param name="uri"> The API URI to call </param>
        /// <param name="fetching"> What the API will be fetching </param>
        public async Task StressTestAPI(string uri, string fetching)
        {
            Console.WriteLine(fetching + " API load testing (1 to 1000)");
            using (var client = new HttpClient())  
            {
                int count = 1;
                for (int i = 0; i < 4; i++)
                {
                    _watch.Restart();
                    for (int j = 0; j < count; j++)
                    {
                        await client.GetAsync(uri);
                    }
                    _watch.Stop();
                    Console.WriteLine("\tFetching "+ count +" " + fetching.ToLower() +"(s) took " + _watch.ElapsedMilliseconds + " ms");
                    count *= 10;                
                }
            }
        }
    }
}