// JSHint options:
/* exported data, dataRegion, dataCountry, lineData */

// Prepare demo data
var data =
[
  {
    'name':'Sauk',
    'hc-key':'us-wi-111',
    'region':2,
    'value':0
  },
  {
    'name':'Iowa',
    'hc-key':'us-wi-049',
    'region':2,
    'value':1
  },
  {
    'name':'Ashland',
    'hc-key':'us-wi-003',
    'region':4,
    'value':2
  },
  {
    'name':'Bayfield',
    'hc-key':'us-wi-007',
    'region':4,
    'value':3
  },
  {
    'name':'Sawyer',
    'hc-key':'us-wi-113',
    'region':4,
    'value':4
  },
  {
    'name':'Columbia',
    'hc-key':'us-wi-021',
    'region':2,
    'value':5
  },
  {
    'name':'Adams',
    'hc-key':'us-wi-001',
    'region':2,
    'value':6
  },
  {
    'name':'Oneida',
    'hc-key':'us-wi-085',
    'region':4,
    'value':7
  },
  {
    'name':'Price',
    'hc-key':'us-wi-099',
    'region':4,
    'value':8
  },
  {
    'name':'Chippewa',
    'hc-key':'us-wi-017',
    'region':3,
    'value':9
  },
  {
    'name':'Clark',
    'hc-key':'us-wi-019',
    'region':3,
    'value':10
  },
  {
    'name':'Outagamie',
    'hc-key':'us-wi-087',
    'region':5,
    'value':11
  },
  {
    'name':'Shawano',
    'hc-key':'us-wi-115',
    'region':5,
    'value':12
  },
  {
    'name':'Lincoln',
    'hc-key':'us-wi-069',
    'region':4,
    'value':13
  },
  {
    'name':'Jefferson',
    'hc-key':'us-wi-055',
    'region':1,
    'value':14
  },
  {
    'name':'Dodge',
    'hc-key':'us-wi-027',
    'region':2,
    'value':15
  },
  {
    'name':'Vilas',
    'hc-key':'us-wi-125',
    'region':4,
    'value':16
  },
  {
    'name':'Forest',
    'hc-key':'us-wi-041',
    'region':4,
    'value':17
  },
  {
    'name':'Green Lake',
    'hc-key':'us-wi-047',
    'region':5,
    'value':18
  },
  {
    'name':'Waushara',
    'hc-key':'us-wi-137',
    'region':5,
    'value':19
  },
  {
    'name':'Green',
    'hc-key':'us-wi-045',
    'region':2,
    'value':20
  },
  {
    'name':'Rock',
    'hc-key':'us-wi-105',
    'region':2,
    'value':21
  },
  {
    'name':'Walworth',
    'hc-key':'us-wi-127',
    'region':1,
    'value':22
  },
  {
    'name':'Barron',
    'hc-key':'us-wi-005',
    'region':3,
    'value':23
  },
  {
    'name':'Pierce',
    'hc-key':'us-wi-093',
    'region':3,
    'value':24
  },
  {
    'name':'Dunn',
    'hc-key':'us-wi-033',
    'region':3,
    'value':25
  },
  {
    'name':'Rusk',
    'hc-key':'us-wi-107',
    'region':3,
    'value':26
  },
  {
    'name':'Taylor',
    'hc-key':'us-wi-119',
    'region':4,
    'value':27
  },
  {
    'name':'Racine',
    'hc-key':'us-wi-101',
    'region':1,
    'value':28
  },
  {
    'name':'Jackson',
    'hc-key':'us-wi-053',
    'region':3,
    'value':29
  },
  {
    'name':'Eau Claire',
    'hc-key':'us-wi-035',
    'region':3,
    'value':30
  },
  {
    'name':'Oconto',
    'hc-key':'us-wi-083',
    'region':5,
    'value':31
  },
  {
    'name':'Brown',
    'hc-key':'us-wi-009',
    'region':5,
    'value':32
  },
  {
    'name':'Milwaukee',
    'hc-key':'us-wi-079',
    'region':1,
    'value':33
  },
  {
    'name':'Ozaukee',
    'hc-key':'us-wi-089',
    'region':1,
    'value':34
  },
  {
    'name':'Richland',
    'hc-key':'us-wi-103',
    'region':2,
    'value':35
  },
  {
    'name':'Crawford',
    'hc-key':'us-wi-023',
    'region':2,
    'value':36
  },
  {
    'name':'Waukesha',
    'hc-key':'us-wi-133',
    'region':1,
    'value':37
  },
  {
    'name':'Juneau',
    'hc-key':'us-wi-057',
    'region':2,
    'value':38
  },
  {
    'name':'Vernon',
    'hc-key':'us-wi-123',
    'region':2,
    'value':39
  },
  {
    'name':'Dane',
    'hc-key':'us-wi-025',
    'region':2,
    'value':40
  },
  {
    'name':'Iron',
    'hc-key':'us-wi-051',
    'region':4,
    'value':41
  },
  {
    'name':'Waupaca',
    'hc-key':'us-wi-135',
    'region':5,
    'value':42
  },
  {
    'name':'Winnebago',
    'hc-key':'us-wi-139',
    'region':5,
    'value':43
  },
  {
    'name':'Kewaunee',
    'hc-key':'us-wi-061',
    'region':5,
    'value':44
  },
  {
    'name':'Portage',
    'hc-key':'us-wi-097',
    'region':4,
    'value':45
  },
  {
    'name':'Calumet',
    'hc-key':'us-wi-015',
    'region':5,
    'value':46
  },
  {
    'name':'La Crosse',
    'hc-key':'us-wi-063',
    'region':3,
    'value':47
  },
  {
    'name':'Marathon',
    'hc-key':'us-wi-073',
    'region':4,
    'value':48
  },
  {
    'name':'Burnett',
    'hc-key':'us-wi-013',
    'region':3,
    'value':49
  },
  {
    'name':'Trempealeau',
    'hc-key':'us-wi-121',
    'region':3,
    'value':50
  },
  {
    'name':'Washburn',
    'hc-key':'us-wi-129',
    'region':3,
    'value':51
  },
  {
    'name':'Pepin',
    'hc-key':'us-wi-091',
    'region':3,
    'value':52
  },
  {
    'name':'Wood',
    'hc-key':'us-wi-141',
    'region':4,
    'value':53
  },
  {
    'name':'Grant',
    'hc-key':'us-wi-043',
    'region':2,
    'value':54
  },
  {
    'name':'Lafayette',
    'hc-key':'us-wi-065',
    'region':2,
    'value':55
  },
  {
    'name':'Sheboygan',
    'hc-key':'us-wi-117',
    'region':5,
    'value':56
  },
  {
    'name':'Marquette',
    'hc-key':'us-wi-077',
    'region':5,
    'value':57
  },
  {
    'name':'Langlade',
    'hc-key':'us-wi-067',
    'region':4,
    'value':58
  },
  {
    'name':'Menominee',
    'hc-key':'us-wi-078',
    'region':5,
    'value':59
  },
  {
    'name':'Washington',
    'hc-key':'us-wi-131',
    'region':1,
    'value':60
  },
  {
    'name':'St. Croix',
    'hc-key':'us-wi-109',
    'region':3,
    'value':61
  },
  {
    'name':'Florence',
    'hc-key':'us-wi-037',
    'region':4,
    'value':62
  },
  {
    'name':'Fond du Lac',
    'hc-key':'us-wi-039',
    'region':5,
    'value':63
  },
  {
    'name':'Monroe',
    'hc-key':'us-wi-081',
    'region':3,
    'value':64
  },
  {
    'name':'Buffalo',
    'hc-key':'us-wi-011',
    'region':3,
    'value':65
  },
  {
    'name':'Door',
    'hc-key':'us-wi-029',
    'region':5,
    'value':66
  },
  {
    'name':'Polk',
    'hc-key':'us-wi-095',
    'region':3,
    'value':67
  },
  {
    'name':'Marinette',
    'hc-key':'us-wi-075',
    'region':5,
    'value':68
  },
  {
    'name':'Douglas',
    'hc-key':'us-wi-031',
    'region':3,
    'value':69
  },
  {
    'name':'Kenosha',
    'hc-key':'us-wi-059',
    'region':1,
    'value':70
  },
  {
    'name':'Manitowoc',
    'hc-key':'us-wi-071',
    'region':5,
    'value':71
  }
];

var dataRegion =
[
  {
    'name': 'South Region',
    'hc-key':'us-wi-region1',
    'region':1,
    'value':200
  },
  {
    'name': 'North Region',
    'hc-key':'us-wi-region2',
    'region':2,
    'value':400
  },
  {
    'name': 'West Region',
    'hc-key':'us-wi-region3',
    'region':3,
    'value':600
  },
  {
    'name': 'Northeast Region',
    'hc-key':'us-wi-region4',
    'region':4,
    'value':800
  },
  {
    'name': 'Southeast Region',
    'hc-key':'us-wi-region5',
    'region':5,
    'value':1000
  }
];

var dataCountry = [
  {
    'hc-key': 'us-ma',
    'name': 'Massachusetts',
    'value': 0
  },
  {
    'hc-key': 'us-wa',
    'name': 'Washington',
    'value': 1
  },
  {
    'hc-key': 'us-ca',
    'name': 'California',
    'value': 2
  },
  {
    'hc-key': 'us-or',
    'name': 'Oregon',
    'value': 3
  },
  {
    'hc-key': 'us-wi',
    'name': 'Wisconsin',
    'value': 4
  },
  {
    'hc-key': 'us-me',
    'name': 'Maine',
    'value': 5
  },
  {
    'hc-key': 'us-mi',
    'name': 'Michigan',
    'value': 6
  },
  {
    'hc-key': 'us-nv',
    'name': 'Nevada',
    'value': 7
  },
  {
    'hc-key': 'us-nm',
    'name': 'New Mexico',
    'value': 8
  },
  {
    'hc-key': 'us-co',
    'name': 'Colorado',
    'value': 9
  },
  {
    'hc-key': 'us-wy',
    'name': 'Wyoming',
    'value': 10
  },
  {
    'hc-key': 'us-ks',
    'name': 'Kansas',
    'value': 11
  },
  {
    'hc-key': 'us-ne',
    'name': 'Nebraska',
    'value': 12
  },
  {
    'hc-key': 'us-ok',
    'name': 'Oklahoma',
    'value': 13
  },
  {
    'hc-key': 'us-mo',
    'name': 'Missouri',
    'value': 14
  },
  {
    'hc-key': 'us-il',
    'name': 'Illinois',
    'value': 15
  },
  {
    'hc-key': 'us-in',
    'name': 'Indiana',
    'value': 16
  },
  {
    'hc-key': 'us-vt',
    'name': 'Vermont',
    'value': 17
  },
  {
    'hc-key': 'us-az',
    'name': 'Arizona',
    'value': 18
  },
  {
    'hc-key': 'us-ar',
    'name': 'Arkansas',
    'value': 19
  },
  {
    'hc-key': 'us-tx',
    'name': 'Texas',
    'value': 20
  },
  {
    'hc-key': 'us-ri',
    'name': 'Rhode Island',
    'value': 21
  },
  {
    'hc-key': 'us-al',
    'name': 'Alabama',
    'value': 22
  },
  {
    'hc-key': 'us-ga',
    'name': 'Georgia',
    'value': 23
  },
  {
    'hc-key': 'us-ms',
    'name': 'Mississippi',
    'value': 24
  },
  {
    'hc-key': 'us-sc',
    'name': 'South Carolina',
    'value': 25
  },
  {
    'hc-key': 'us-nc',
    'name': 'North Carolina',
    'value': 26
  },
  {
    'hc-key': 'us-va',
    'name': 'Virginia',
    'value': 27
  },
  {
    'hc-key': 'us-ia',
    'name': 'Iowa',
    'value': 28
  },
  {
    'hc-key': 'us-md',
    'name': 'Maryland',
    'value': 29
  },
  {
    'hc-key': 'us-de',
    'name': 'Delaware',
    'value': 30
  },
  {
    'hc-key': 'us-nj',
    'name': 'New Jersey',
    'value': 31
  },
  {
    'hc-key': 'us-pa',
    'name': 'Pennsylvania',
    'value': 32
  },
  {
    'hc-key': 'us-ny',
    'name': 'New York',
    'value': 33
  },
  {
    'hc-key': 'us-id',
    'name': 'Idaho',
    'value': 34
  },
  {
    'hc-key': 'us-sd',
    'name': 'South Dakota',
    'value': 35
  },
  {
    'hc-key': 'us-ct',
    'name': 'Connecticut',
    'value': 36
  },
  {
    'hc-key': 'us-nh',
    'name': 'New Hampshire',
    'value': 37
  },
  {
    'hc-key': 'us-ky',
    'name': 'Kentucky',
    'value': 38
  },
  {
    'hc-key': 'us-oh',
    'name': 'Ohio',
    'value': 39
  },
  {
    'hc-key': 'us-tn',
    'name': 'Tennessee',
    'value': 40
  },
  {
    'hc-key': 'us-wv',
    'name': 'West Virginia',
    'value': 41
  },
  {
    'hc-key': 'us-dc',
    'name': 'District of Columbia',
    'value': 42
  },
  {
    'hc-key': 'us-la',
    'name': 'Louisiana',
    'value': 43
  },
  {
    'hc-key': 'us-fl',
    'name': 'Florida',
    'value': 44
  },
  {
    'hc-key': 'us-mn',
    'name': 'Minnesota',
    'value': 45
  },
  {
    'hc-key': 'us-mt',
    'name': 'Montana',
    'value': 46
  },
  {
    'hc-key': 'us-nd',
    'name': 'North Dakota',
    'value': 47
  },
  {
    'hc-key': 'us-ut',
    'name': 'Utah',
    'value': 48
  },
  {
    'hc-key': 'us-hi',
    'name': 'Hawaii',
    'value': 49
  },
  {
    'hc-key': 'us-ak',
    'name': 'Alaska',
    'value': 50
  }
];

var lineData =
[
  [
    {
      'Region':1,
      'Year':2008,
      'Sample Size':52,
      'value':0.5203589134,
      'Margin of Error':0.1047309807
    },
    {
      'Region':1,
      'Year':2009,
      'Sample Size':92,
      'value':0.334549563,
      'Margin of Error':0.0953322388
    },
    {
      'Region':1,
      'Year':2010,
      'Sample Size':221,
      'value':0.3383113914,
      'Margin of Error':0.0725945208
    },
    {
      'Region':1,
      'Year':2011,
      'Sample Size':221,
      'value':0.2404494041,
      'Margin of Error':0.0785748308
    },
    {
      'Region':1,
      'Year':2012,
      'Sample Size':112,
      'value':0.4023285563,
      'Margin of Error':0.1633275191
    },
    {
      'Region':1,
      'Year':2013,
      'Sample Size':138,
      'value':0.3391969109,
      'Margin of Error':0.0860511306
    }
  ],

  [
    {
      'Region':2,
      'Year':2008,
      'Sample Size':63,
      'value':0.2794301682,
      'Margin of Error':0.1260537263
    },
    {
      'Region':2,
      'Year':2009,
      'Sample Size':87,
      'value':0.3362849054,
      'Margin of Error':0.1720292825
    },
    {
      'Region':2,
      'Year':2010,
      'Sample Size':178,
      'value':0.3274854438,
      'Margin of Error':0.0637528
    },
    {
      'Region':2,
      'Year':2011,
      'Sample Size':156,
      'value':0.2397726546,
      'Margin of Error':0.0738480132
    },
    {
      'Region':2,
      'Year':2012,
      'Sample Size':61,
      'value':0.1865936998,
      'Margin of Error':0.0949863008
    },
    {
      'Region':2,
      'Year':2013,
      'Sample Size':92,
      'value':0.163762257,
      'Margin of Error':0.0994633321
    }
  ],

  [
    {
      'Region':3,
      'Year':2008,
      'Sample Size':33,
      'value':0.3306753648,
      'Margin of Error':0.1213357436
    },
    {
      'Region':3,
      'Year':2009,
      'Sample Size':64,
      'value':0.4191789469,
      'Margin of Error':0.1457565924
    },
    {
      'Region':3,
      'Year':2010,
      'Sample Size':128,
      'value':0.2327737383,
      'Margin of Error':0.0996975682
    },
    {
      'Region':3,
      'Year':2011,
      'Sample Size':130,
      'value':0.3322035795,
      'Margin of Error':0.0491846224
    },
    {
      'Region':3,
      'Year':2012,
      'Sample Size':42,
      'value':0.2554926114,
      'Margin of Error':0.1352349426
    },
    {
      'Region':3,
      'Year':2013,
      'Sample Size':33,
      'value':0.2142749438,
      'Margin of Error':0.1468030153
    }
  ],

  [
    {
      'Region':4,
      'Year':2008,
      'Sample Size':23,
      'value':0.4284843509,
      'Margin of Error':0.0388345652
    },
    {
      'Region':4,
      'Year':2009,
      'Sample Size':16,
      'value':0.5494632666,
      'Margin of Error':0.2724005527
    },
    {
      'Region':4,
      'Year':2010,
      'Sample Size':144,
      'value':0.4614409853,
      'Margin of Error':0.047471898
    },
    {
      'Region':4,
      'Year':2011,
      'Sample Size':137,
      'value':0.3771533461,
      'Margin of Error':0.1048008233
    },
    {
      'Region':4,
      'Year':2012,
      'Sample Size':52,
      'value':0.1087204324,
      'Margin of Error':0.1503715909
    },
    {
      'Region':4,
      'Year':2013,
      'Sample Size':41,
      'value':0.2772746659,
      'Margin of Error':0.0282375151
    }
  ],

  [
    {
      'Region':5,
      'Year':2008,
      'Sample Size':37,
      'value':0.2617013752,
      'Margin of Error':0.1110793155
    },
    {
      'Region':5,
      'Year':2009,
      'Sample Size':35,
      'value':0.2357969283,
      'Margin of Error':0.1237217057
    },
    {
      'Region':5,
      'Year':2010,
      'Sample Size':184,
      'value':0.3098831467,
      'Margin of Error':0.094585037
    },
    {
      'Region':5,
      'Year':2011,
      'Sample Size':166,
      'value':0.2883717941,
      'Margin of Error':0.0672235869
    },
    {
      'Region':5,
      'Year':2012,
      'Sample Size':122,
      'value':0.2660289792,
      'Margin of Error':0.0836801601
    },
    {
      'Region':5,
      'Year':2013,
      'Sample Size':81,
      'value':0.3229413723,
      'Margin of Error':0.0638039955
    }
  ]
];
