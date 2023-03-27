using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
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
            List<String> reports = new List<string>();
            string startMessage = fetching + " API load testing (1 to 1000)";
            Console.WriteLine(startMessage);
            reports.Add(startMessage);

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
                    reports.Add(count + ": " + _watch.ElapsedMilliseconds + " ms");
                    count *= 10;                
                }
            }
            await File.WriteAllLinesAsync("metrics/" + fetching.ToLower() + "api_metrics.txt", reports);
            Console.WriteLine("Done\n");
        }
    }
}