import requests
from bs4 import BeautifulSoup
import re


# get codes as a list
def getCodes(url, start=1, end=2):
    req = requests.get(url)
    soup = BeautifulSoup(req.text, 'lxml')
    flag = '</code></pre></div>.?<pre><code class="python language-python">'
    
    for i in range(start, end):
        selector = "div[class='collapseomatic_content']"
        codes_raw = soup.select(selector)
        codes_clean = [fence.get_text().strip() for fence in codes_raw]
        all_codes.append(codes_clean)
    return codes_clean

# save codes to file
def saveCodes(file_path, method):
    pyf = open(file_path, method)
    for codes in all_codes:
        for code_true in codes:
            pyf.write('#%%\n')
            pyf.write(code_true)
            pyf.write('\n\n')
    pyf.close()


if __name__ == "__main__":
    all_codes = []
    url = 'https://www.machinelearningplus.com/plots/top-50-matplotlib-visualizations-the-master-plots-python/'
    # parameters to set
    fspace = ''
    # run
    getCodes(url )
    saveCodes(fspace + 'mpl50' + '.py', "a+")
