const fs = require("fs")
const http = require("https")
const client = require('cheerio-httpcli');

const url = "https://vuejs-meetup.connpass.com/event/65442/participation/"

function retFirstMatched(str, regex){
  var matched = str.match(regex)
  if(matched && matched.length > 0){
    return matched[1]
  }
  return ""
}

client.fetch(url, { }, function (err, $, res, body) {
  // レスポンスヘッダを参照
  console.log(res.headers);

  // HTMLタイトルを表示
  console.log($('title').text());

  var result = []
  $('.participants_table tr').each(function (idx) {
    const screenName = $(this).find(".display_name").text().trim()
    const connpassUrl = $(this).find(".display_name a").attr("href")
    var connpassId = ""
    if(connpassUrl){
      connpassId = retFirstMatched(connpassUrl, /^https:\/\/connpass.com\/user\/([^\/]+)\/$/)
    }
    const ptype = $(this).find(".label_ptype_name").text().trim()
    const status = $(this).find(".label_status_tag").text().trim().replace(/ /g, "").split("\n").join("#")
    const link = $(this).find(".social a").attr("href")
    var gh = ""
    var tw = ""
    if(link){
      gh = retFirstMatched(link, /^https:\/\/github.com\/([^\/]+)\/$/)
      tw = retFirstMatched(link, /^https:\/\/twitter.com\/intent\/user\?screen_name=(.+)$/)
    }
    
    if(screenName){
      result.push({
        screenName: screenName,
        id: connpassId,
        ptype: ptype,
        status: status,
        github: gh,
        twitter: tw
      })
    }
  });

  console.log(result)

});
