// Define interfaces for the region data
export interface IBlock {
    title: string;
    description: string;
  }
  
  export interface IProduct {
    id: string;
    name: string;
    imageUrl: string;
    // Add other product properties as needed
  }
  
  export interface IRegionData {
    imageUrl: string;
    headerText: string;
    blocks: IBlock[];
    products: IProduct[];
  }
  
  // Define data for regions
  const regionsData: Record<string, IRegionData> = {
    alsace: {
      imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/ALSACE-min.jpg',
      headerText: "Les vins d'Alsace proviennent de la région viticole d'Alsace, située dans le nord-est de la France, près de la frontière allemande. Cette région est réputée pour ses vins blancs aromatiques et élégants. On les apprécie pour leur authenticité, leur caractère et leur polyvalence à table. Leur étiquetage transparent, qui indique souvent le cépage et le millésime, facilite le choix pour les consommateurs. L'Alsace est une région viticole unique en France, célèbre pour la qualité constante de ses vins blancs depuis des siècles",
      blocks: [
        { title: 'Les Cépages', description: "Les vins d'Alsace sont principalement élaborés à partir de cépages blancs. Les variétés les plus courantes incluent le Riesling, le Gewurztraminer, le Pinot Gris, le Muscat et le Sylvaner. Chaque cépage a ses propres caractéristiques aromatiques. Ils sont généralement vinifiés en sec" },
        { title: 'Une palette aromatique fraîche', description: "Les vins d'Alsace sont connus pour leur pureté, leur fraîcheur et leur complexité aromatique. Ils offrent une grande variété de saveurs, allant des agrumes et des fruits à noyau aux épices, aux fleurs et aux minéraux, en fonction du cépage." },
        { title: 'Appellations et terroir', description: "Les vins d'Alsace sont souvent classés en fonction du cépage et du terroir. Les appellations les plus renommées incluent Alsace AOC (pour les vins génériques), Alsace Grand Cru AOC (pour les vins issus de vignobles spécifiques) et Crémant d'Alsace (pour les vins effervescents)." },
        { title: 'Ça mousse aussi en Alsace', description: "L'Alsace est également réputée pour ses vins mousseux de qualité, élaborés selon la méthode traditionnelle (comme le champagne). Le Crémant d'Alsace est souvent produit à partir de cépages blancs et offre des bulles fines."},
      ],
      products: [
        // List of product objects related to Alsace
        { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
        // ...other products
      ],
    },
    sud_ouest: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/SUD-OUEST-min.jpg',
        headerText: 'Les vins du Sud-Ouest de la France sont une véritable découverte pour les amateurs de vin. Cette vaste région viticole, est connue pour sa diversité de cépages et de terroirs, ce qui lui permet de produire une grande variété de vins rouges, blancs et rosés de haute qualité. Connus pour leur authenticité et leur caractère unique, ils offrent une grande diversité de styles, ce qui en fait une destination idéale pour les amateurs de vin curieux à la recherche de découvertes gustatives.',
        blocks: [
          { title: 'Cahors', description: "Cahors est célèbre pour ses vins rouges robustes élaborés à partir du cépage Malbec. Ces vins sont souvent foncés, riches en saveurs de fruits noirs, de prune et d'épices. Ils sont connus sous le nom de 'vin noir' en raison de leur couleur profonde." },
          { title: 'Madiran', description: "Madiran : Cette région, située dans les Hautes-Pyrénées, est réputée pour ses vins rouges corsés élaborés à partir du cépage Tannat. Les vins de Madiran sont tanniques, riches en arômes de fruits noirs et d'épices, et ont souvent un potentiel de vieillissement considérable." },
          { title: 'Jurançon', description: "Jurançon : La région de Jurançon, dans les Pyrénées-Atlantiques, est célèbre pour ses vins blancs doux et moelleux élaborés à partir des cépages Gros Manseng et Petit Manseng. Ces vins offrent des arômes de fruits tropicaux, d'agrumes et de miel, avec une acidité rafraîchissante." },
          { title: "Et d'autres pépites…", description: "Si Fronton, située près de Toulouse est réputée pour ses vins rouges, vous connaissez aussi Côtes du Brulhois, Gaillac, Bergerac et Marcillac. Les Côtes de Gascogne produisent principalement des vins blancs secs à partir de Colombard, Ugni Blanc et Gros Manseng souvent frais, aromatiques et faciles à boire."},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      champagne: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/CHAMPAGNE-min.jpg',
        headerText: "Le vignoble champenois est l'un des plus dynamiques de France, grâce au véritable renouveau des cuvées. Inscrite au patrimoine mondial de l'UNESCO depuis 2015 c'est encore aujourd'hui l'un des vignobles les plus dynamiques de France. Il s'étend sur plus de 33 000 hectares dans les départements de la Marne, de l'Aube et de l'Aisne. Si les vignerons possèdent 89% du vignoble, trois familles se partagent la production. Au XVIe siècle, grâce au talent de Dom Pérignon (1638-1715), le titre n'a cessé de croître",
        blocks: [
          { title: 'Une méthode unique', description: "La Méthode Champenoise implique une seconde fermentation en bouteille, qui crée les célèbres bulles de champagne : Pressurage, Assemblage, Mise en bouteille et Vieillissement sont suivis du dégorgeage pour éliminer les sédiments. Une petite quantité de liqueur est alors ajoutée pour déterminer le niveau de douceur du champagne." },
          { title: 'Des variétés et des styles', description: "Il existe plusieurs styles de champagne: Brut - Sec, avec peu de sucre résiduel, c'est le style le plus courant de champagne. Extra Brut est encore plus sec que le brut, avec très peu de sucre résiduel. Légèrement sucré, le Sec joue l’équilibre douceur - acidité." },
          { title: 'Les Maisons de Champagne', description: "Maisons de Champagne : La région de Champagne est le siège de nombreuses maisons de champagne renommées, telles que Veuve Clicquot, Moët & Chandon, Dom Pérignon, Bollinger, Krug, et bien d'autres. Chacune de ces maisons a son propre style et son propre assemblage de raisins." },
          { title: 'Millésimé vs Non Millésimé', description: "Millésimé vs Non Millésimé : Produits à partir de raisins récoltés lors d'une année exceptionnelle, ils sont considérés comme les cuvées les plus raffinées et vieillissent plus longtemps. Les champagnes non millésimés sont des assemblages de plusieurs années sont l’arôme maintient la cohérence du style de la maison"},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      Corse: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/CORSE-min.jpg',
        headerText: "Les vins corses sont un trésor bien gardé de la Méditerranée. Produits sur l'île de beauté, ces vins reflètent la richesse du terroir corse. Les cépages autochtones tels que le Niellucciu et le Vermentinu donnent naissance à des rouges corsés et des blancs frais aux arômes d'agrumes. Les rosés sont parfaits pour les journées ensoleillées. Le terroir méditerranéen, avec ses sols rocailleux et son climat ensoleillé, confère aux vins corses une personnalité unique. Voici nos coups de coeur du moment",
        blocks: [
          { title: 'PATRIMONIO BLANC E CROCE 2022 - DOMAINE YVES LECCIA', description: "Vif et légèrement savoureux, il conjugue parfaitement les arômes de fleurs blanches, d'aubépine et de miel. On imagine déjà le déguster avec un joli foie gras... un blanc tout en velours et en ampleur pour accompagner des plats délicats."},
          { title: 'CLOS CANARELLI ROSE 2022', description: "Voilà un Rosé Corse qui affirme haut et fort son caractère ! Les yeux fermés, vous découvrirez un trait vif et rayonnant avec ce cépage travaillé dans le respect et la tradition, qui lui préserve et en extrait toute la pureté du fruit." },
          { title: 'ROSUMARINU Rouge 2022 - DOMAINE SANT ARMETTU', description: "Elevée en Méditerranée, dans une vallée de Sartène, cette cuvée 2022 aux vignes audacieuses est plantée dans un sol d’arènes granitiques. C’est un premier millésime en agriculture biologique qui se laisse caresser par la lumière du golfe de Tizzano." },
          { title: 'PINOT NOIR RESERVE 2022 - BARTON & GUESTIER', description: "Cépage typique de Bourgogne, il vient crâner en Corse ! Ce Pinot Noir est doux et rond, issu du cépage frais, avec de jolis arômes de fruits des bois bien mûrs. Le nez s'inspire de l'arôme du café. Etonnant!"},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      bourgogne: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/BOURGOGNE-min.jpg',
        headerText: "Les vins de Bourgogne sont célèbres pour leur qualité et leur diversité. La région est principalement connue pour ses vins rouges à base de Pinot Noir et ses vins blancs élaborés à partir du Chardonnay. La Bourgogne est divisée en plusieurs appellations, dont les plus prestigieuses sont les Grands Crus. Les vins rouges sont délicats, avec des arômes de fruits rouges, tandis que les blancs sont riches et beurrés. La Bourgogne est synonyme d'excellence en matière de vin, offrant une expérience gustative inoubliable.",
        blocks: [
          { title: 'Les Appellations Régionales', description: "Bourgogne Blanc et Bourgogne Rouge couvrent toute la région de Bourgogne et peuvent provenir de vignobles situés dans différentes parties de la Bourgogne. Elles offrent des vins de qualité variée, des plus simples aux plus élaborés." },
          { title: 'Les Appellations Village', description: "Chaque village ou commune a son propre nom d'appellation (par exemple, Gevrey-Chambertin, Nuits-Saint-Georges, Pommard, Puligny-Montrachet). Ces vins sont généralement de meilleure qualité que les appellations régionales."},
          { title: 'Premier Crus et Grand Cru', description: "Ces vignobles spécifiques dans chaque village sont classés en Premier Cru en raison de leur qualité supérieure. Les Grand Cru sont les plus prestigieux de Bourgogne comme la Romanée-Conti ou le Corton-Charlemagne et représentant moins de 2 % de la production totale"},
          { title: 'Les appellations Régionales Spécifiques', description: "Chablis est une sous-région de la Bourgogne réputée pour ses vins blancs secs à base de Chardonnay. Beaune est connue pour ses vins rouges élégants et ses blancs aromatiques. Le Mâconnais au sud, produit de somptueux Chardonnay, comme le Pouilly-Fuissé."},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      bordeaux: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/BORDEAUX-min.jpg',
        headerText: "Les vins de Bordeaux, en France, sont parmi les plus célèbres et les plus prestigieux au monde. Cette région viticole, située dans le sud-ouest de la France, est connue pour sa diversité de cépages, de terroirs et de styles de vin. Ils sont appréciés pour leur complexité, leur équilibre et leur capacité de vieillissement. Souvent associés à des noms prestigieux tels que Château Margaux, Château Lafite Rothschild ou Pétrus, Bordeaux centrale dans le monde du vin, offrant une expérience gustative variée et raffinée",
        blocks: [
          { title: 'Cépages et sous-régions', description: "Bordeaux est célèbre pour ses assemblages de cépages, principalement le Merlot, le Cabernet Sauvignon, le Cabernet Franc, le Petit Verdot et le Malbec. Divisée en plusieurs sous-régions, on y découvre les Médoc, les Graves, Saint-Émilion et Pomerol. Chacun brille sous- ses propres caractéristiques" },
          { title: 'Les vins de Bordeaux Rouges', description: "Les vins rouges de Bordeaux sont réputés pour leur élégance, leur structure tannique et leurs arômes de fruits rouges, de cassis, de cerise et d'épices. Les assemblages varient en fonction des sous-régions, avec par exemple plus de Cabernet Sauvignon dans le Médoc et plus de Merlot à Saint-Émilion."},
          { title: 'Les vins de Bordeaux Blancs', description: "Bordeaux produit également des vins blancs secs incroyables à partir de cépages tels que le Sauvignon Blanc, le Sémillon et la Muscadelle. Les vins blancs de Bordeaux sont frais, aromatiques et peuvent avoir des notes d'agrumes, de pêche et de fleurs blanches."},
          { title: 'Des vins de garde exceptionnels', description: "De nombreux vins de Bordeaux sont conçus pour vieillir en bouteille de nombreuses années. Les grands crus classés du Médoc, par exemple, peuvent atteindre leur apogée après plusieurs décennies de garde en cave ce qui classe certains domaines comme 'premiers crus' ou 'grands crus classés'"},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      beaujolais: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg',
        headerText: "Les vins du Beaujolais proviennent de la région viticole du Beaujolais, située en Bourgogne, en France. Cette région est principalement connue pour ses vins rouges légers et fruités élaborés à partir du cépage Gamay. Les Beaujolais sont appréciés pour leur. Ils offrent une alternative agréable aux vins rouges plus corsés de la Bourgogne voisine, et leur style léger les rend idéaux pour les dégustations décontractées et les repas légers. Il n’existe pas une, mais bien des centaines d’expressions de Beaujolais !",
        blocks: [
          { title: 'Une technique spécifique', description: "La vinification des vins du Beaujolais est marquée par une technique spéciale appelée macération carbonique. Cela signifie que les raisins entiers sont fermentés dans des cuves remplies de dioxyde de carbone. Cette méthode permet d'obtenir des vins fruités et peu tanniques, avec une couleur vive.ressions de Beaujolais ." },
          { title: 'Les appélations Beaujolais', description: "Les vins du Beaujolais sont classés en plusieurs appellations, dont la plus célèbre est l'appellation Beaujolais, suivie de Beaujolais-Villages et de dix crus spécifiques, chacun avec ses caractéristiques propres. Parmi les crus les plus renommés, on trouve Morgon, Fleurie, Brouilly et Moulin-à-Vent."},
          { title: 'Convivialité et fraîcheur', description: "Les vins du Beaujolais sont réputés pour leur buvabilité et leur convivialité. Ils sont souvent consommés jeunes, quelques mois après la récolte. Ils sont légers en bouche, avec une acidité vive et des tanins souples. Les arômes de fruits rouges dominent, avec une touche de minéralité"},
          { title: 'Le Beaujolais "Nouveau"', description: "Le troisième jeudi de novembre, le Beaujolais Nouveau est mis en vente. C'est un vin très jeune, souvent consommé dans les semaines qui suivent la récolte. Il est léger, fruité et festif. Attention aux marketing. Faites confiance aux petits producteurs qui font de vraies petites merveilles"},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      provence: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/PROVENCE-min.jpg',
        headerText: "Les vins de Provence sont une catégorie de vins produits dans la région de Provence, située dans le sud-est de la France, le long de la côte méditerranéenne. La Provence est l'une des régions vinicoles les plus anciennes de France, avec une histoire viticole remontant à plus de 2 600 ans. Les vins de Provence sont souvent associés à la douceur de vivre méditerranéenne et sont très appréciés pour leur polyvalence, en particulier les rosés, qui se marient bien avec une variété de plats.",
        blocks: [
          { title: 'Les fameux Rosés de Provence', description: "Les Vins Rosés de Provence, emblématiques de la région sont parmi les meilleurs au monde. Appréciés pour leur fraîcheur, leurs arômes de fruits rouges et d'agrumes et leur caractère sec et élégant, on les appelle Côtes de Provence, Coteaux d'Aix-en-Provence, Coteaux Varois en Provence, Bandol." },
          { title: 'Les blancs aussi', description: "Les Vins Blancs de Provence gagnent en popularité. Ils sont élaborés à partir de cépages tels que le Rolle, le Clairette, le Grenache Blanc et le Marsanne. Ils offrent une belle fraîcheur, des arômes d'agrumes et de fleurs blanches Appellations notables : Cassis, Palette, Bellet."},
          { title: 'Aaah la Syrah de Provence!', description: "Vins Rouges de Provence sont moins fréquents que les rosés et les blancs. Ils sont souvent élaborés à partir de cépages tels que le Grenache, le Mourvèdre, la Syrah et le Cinsault. Ils ont tendance à être corsés, épicés et peuvent avoir un potentiel de vieillissement."},
          { title: 'Les appélations en Provence', description: "Appellations notables : La superbe Côtes de Provence et ses rosés. Bandol : Célèbre pour ses vins rouges à base de Mourvèdre Cassis : Connue pour ses vins blancs élégants et ses rouges corsés. Bellet : Célèbre pour ses vins blancs frais et minéraux."},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      savoie: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/SAVOIE.jpg',
        headerText: "Les vins de Savoie proviennent de la région viticole de Savoie, située dans les Alpes françaises, à proximité de la frontière suisse et italienne. Cette région montagneuse produit principalement des vins blancs, bien que des vins rouges et rosés soient également élaborés. Ils ont un caractère unique et ont une capacité unique à refléter le terroir Alpin. Fermez les yeux.... Ils sont parfaits pour ceux qui recherchent des vins légers, frais et authentiques, en particulier en accompagnement de la cuisine de montagne.",
        blocks: [
          { title: 'Le climat Alpin', description: "Les vins de Savoie sont principalement élaborés à partir de cépages indigènes, dont les plus célèbres sont la Jacquère, l'Altesse (ou Roussette), et le Mondeuse pour les rouges. Ces cépages sont bien adaptés au climat alpin et donnent des vins avec une belle acidité." },
          { title: 'Des arômes de fruits et minéraux', description: "Les vins blancs de Savoie sont légers, rafraîchissants, et sont souvent marqués par des arômes de fruits verts, de fleurs blanches et de minéraux. L'Altesse produit des vins blancs plus complexes et aromatiques, tandis que la Jacquère donne des vins plus légers et faciles à boire."},
          { title: 'La fleur, les fruits et les épices', description: "Les vins rouges de Savoie sont élaborés à partir du cépage Mondeuse. Ils sont généralement légers en bouche et parfois fleuris, avec des arômes de fruits rouges et d'épices. Ils sont faciles à boire entre amis, sur un repas d’été ou des légumes mi-cuits…"},
          { title: 'La Roussette de Savoie: Une AOC', description: "Cette appellation est réservée aux vins blancs produits à partir du cépage Altesse. Ils sont généralement riches et aromatiques. Le Crémant de Savoie fait partie des vins effervescents de qualité, appelés Crémant de Savoie, élaborés selon la méthode traditionnelle."},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      languedoc_roussillon: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/LANGUEDOC-min.jpg',
        headerText: "Les vins du Languedoc-Roussillon proviennent du sud de la France, s'étendant le long de la côte méditerranéenne, de la frontière espagnole à la frontière italienne. Cette région est l'une des plus vastes et des plus diversifiées de France en termes de styles de vin et de cépages. Ils représentent la diversité et la qualité de la viticulture du sud de la France et offrent une grande variété de styles et de saveurs faisant de la région un formidable terrain pour les amateurs de vin.",
        blocks: [
          { title: 'Des cépages a en perdre son latin', description: "Le Languedoc-Roussillon est célèbre pour sa grande variété de cépages, allant des traditionnels comme le Carignan, le Grenache, la Syrah et le Mourvèdre, le Merlot, le Cabernet Sauvignon, le Chardonnay ... On y trouve autant de rouges épicés que de blancs aromatiques ou de rosés fruités" },
          { title: 'Des collines, des côtes et des plaines', description: "Le Languedoc-Roussillon possède une grande superbe diversité de terroirs, allant des collines côtières aux plaines intérieures, en passant par les montagnes des Pyrénées. Chaque sous-région a son propre climat, son style de sol et topographie, ce qui donne naissance à une grande variété de vins."},
          { title: 'Accords et mets', description: "Les vins du Languedoc-Roussillon s'accordent bien avec une variété de plats méditerranéens, notamment la cuisine espagnole, italienne et provençale. Les rouges corsés sont parfaits pour les grillades, tandis que les blancs sont idéaux pour les fruits de mer et les plats d'été léger"},
          { title: 'Une région qui regorge de pépites', description: "Le Languedoc-Roussillon est souvent associé à des vins de grande valeur, car de nombreux producteurs proposent des vins de qualité à des prix abordables, ce qui en fait un choix populaire pour les amateurs de vin au budget limité mais aussi pour les chasseurs de bonnes petites bouteilles."},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      cotes_du_rhone: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/COTES-DU-RHONE-min.jpg',
        headerText: "Les vins des Côtes du Rhône proviennent du sud-est de la France, célèbre pour ses vins rouges, blancs et rosés de grande qualité. Ils sont appréciés pour leur diversité et leur qualité constante. Que vous recherchiez un rouge corsé pour accompagner une pièce de bœuf ou un blanc frais pour accompagner des fruits de mer, les Côtes du Rhône offrent une variété de styles pour satisfaire le plus grands gourmands. De nombreux Côtes du Rhône sont dédormais travaillés en viticulture biologique et biodynamique.",
        blocks: [
          { title: 'Des cépages indigènes', description: "Vif et légèrement savoureux, il conjugue parfaitement les arômes de fleurs blanches, d'aubépine et de miel. On imagine déjà le déguster avec un joli foie gras... un blanc tout en velours et en ampleur pour accompagner des plats délicats.Les vins des Côtes du Rhône sont principalement élaborés à partir de cépages indigènes. Pour les rouges, le Grenache est souvent le cépage dominant, accompagné de la Syrah, du Mourvèdre, du Carignan et d'autres. Les blancs sont principalement produits à partir de la Marsanne" },
          { title: 'Une variété inouie', description: "La région produit une grande variété de vins, allant des rouges corsés et épicés aux blancs aromatiques et aux rosés fruités. Les vins des Côtes du Rhône sont souvent bien équilibrés, avec une acidité rafraîchissante et des tanins soyeux pour les rouges."},
          { title: 'Un terroir riche', description: "La région du Rhône est caractérisée par une grande diversité de terroirs, avec des sols allant des galets roulés dans la vallée du Rhône aux sols argilo-calcaires des coteaux. Chaque sous-région, comme le Châteauneuf-du-Pape, le Hermitage, le Côte-Rôtie, et le Gigondas, a ses propres caractéristiques uniques."},
          { title: "Des appéllations d'exception", description: "La région comprend plusieurs appellations d'origine contrôlée (AOC), y compris les Côtes du Rhône AOC (pour les vins génériques), ainsi que de nombreuses appellations village et des crus spécifiques, chacune ayant ses propres règles de production et de cépages autorisés. Le Châteauneuf-du-Pape par exepmle est très prisé !"},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      jura: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/JURA-min.jpg',
        headerText: "Les vins du Jura sont produits dans l'est de la France, près de la frontière suisse. Cette région est célèbre pour ses vins uniques, notamment des vins blancs secs et doux, des vins jaunes et des vins de paille. Ils sont connus pour leur originalité et leur complexité. Ils sont produits en quantités limitées et sont très prisés par les amateurs de vin à la recherche de saveurs uniques. La région du Jura est un véritable trésor pour les amateurs de vins peu communs.",
        blocks: [
          { title: 'Chardonnay et Savagnin', description: "Les vins du Jura sont élaborés à partir de cépages très variés. Pour les blancs, le Chardonnay est le cépage le plus courant, suivi de près par le Savagnin. Pour les rouges, le Poulsard (ou Ploussard) et le Trousseau sont les cépages phares" },
          { title: 'Le fameux Vin Jaune', description: "Le vin jaune est l'un des trésors du Jura. Il est élaboré à partir du cépage Savagnin et est vieilli en fûts de chêne non remplis, ce qui permet au vin de développer un voile de levures similaire à celui du Sherry."},
          { title: 'Les Vins de Paille', description: "Les vins de paille du Jura sont des vins doux élaborés à partir de raisins récoltés et séchés sur des nattes de paille. Cela concentre les sucres et les arômes. Ils sont riches, sucrés et ont des arômes de fruits confits, de miel et d'épices."},
          { title: 'Agrumes et pommes vertes', description: "Le Macvin est une spécialité du Jura, un vin de liqueur élaboré en mélangeant du moût de raisin avec de l'eau-de-vie de marc. Le Jura produit également des vins blancs secs, principalement à partir du Chardonnay, frais, minéraux, avec des notes d'agrumes et de pomme verte."},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
      loire: {
        imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/LOIRE-SANCERRE-min.jpg',
        headerText: "Le vignoble du Val de Loire est une vaste région viticole en France, regroupant plusieurs régions viticoles en une seule catégorie. Ces régions produisent des vins blancs secs, semi-secs, corsés et même sirupeux, principalement des vins rouges légers et des vins rosés. Il existe également de nombreux vins effervescents. Toutes ces zones sont situées sur les rives de la Loire et de ses affluents, et certaines sont situées dans la vallée de la Loire. Elles sont divisées entre 4 production, à savoir Nantes, Anjou, Touraine et Centre",
        blocks: [
          { title: 'Cépages', description: "La vallée de la Loire abrite une grande variété de cépages, tant blancs que rouges. Parmi les cépages blancs les plus célèbres, on trouve le Sauvignon Blanc, le Chenin Blanc et le Muscadet. Pour les rouges, le Cabernet Franc, le Gamay et le Pinot Noir sont prédominants." },
          { title: 'Diversité des Styles', description: "La vallée de la Loire produit une gamme incroyablement diversifiée de vins, allant des blancs secs, vifs et minéraux aux blancs moelleux et liquoreux, des rouges légers et fruités aux rouges structurés et corsés, ainsi que des rosés et de merveilleux vins pétillants."},
          { title: 'Vins Rouges', description: "Les vins rouges de la Loire sont souvent élaborés à partir du Cabernet Franc, qui donne des vins élégants, avec des arômes de fruits rouges, d'épices et de végétal. Le Gamay est également utilisé pour produire des vins rouges légers et fruités, particulièrement dans l'appellation Touraine."},
          { title: 'Vins Blancs', description: "Les vins blancs de la Loire sont parmi les plus réputés au monde. Issus du Sauvignon Blanc, l'appellation Sancerre, ils sont renommés pour leur acidité vive et leurs arômes d'agrumes et de fleurs. Les vins de Chenin Blanc, notamment ceux de l'appellation Vouvray, offrent beaucoup de styles."},
        ],
        products: [
          // List of product objects related to Alsace
          { id: 'prod1', name: 'Wine 1', imageUrl: 'https://storage.googleapis.com/alakave-ef7b3.appspot.com/alakave-public/cms/Beaujolais.jpg' },
          // ...other products
        ],
      },
  
  };
  
  export default regionsData;
  