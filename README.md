#Magic Tabs

Demo: http://luke.sno.wden.co.uk/jquery-magic-tabs

Really cant get much more simpler than this...

```javascript
// these are defaults, no need to pass the options
$('.content').magicTabs({
	headingTag 	: 'h2',
	bodyClass 	: 'body',
	headClass 	: 'head',
	activeClass : 'active',
});
```

```html

<div class="content">

	<h2>Some amazing header</h2>

	<p>Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Cum sociis natoque penatibus et magnis dis parturient. Unam incolunt Belgae, aliam Aquitani, tertiam. Hi omnes lingua, institutis, legibus inter se differunt.</p>
	<p>Curabitur blandit tempus ardua ridiculus sed magna. Quam diu etiam furor iste tuus nos eludet? Curabitur est gravida et libero vitae dictum. Qui ipsorum lingua Celtae, nostra Galli appellantur. Hi omnes lingua, institutis, legibus inter se differunt. Curabitur blandit tempus ardua ridiculus sed magna.</p>
	<p>Hi omnes lingua, institutis, legibus inter se differunt. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Curabitur blandit tempus ardua ridiculus sed magna. Salutantibus vitae elit libero, a pharetra augue.</p>

	<h2>And yet another...</h2>

	<p>Curabitur blandit tempus ardua ridiculus sed magna. Inmensae subtilitatis, obscuris et malesuada fames. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Unam incolunt Belgae, aliam Aquitani, tertiam. Pellentesque habitant morbi tristique senectus et netus. Qui ipsorum lingua Celtae, nostra Galli appellantur.</p>

	<h2>Some amazing header</h2>

	<p>Nihilne te nocturnum praesidium Palati, nihil urbis vigiliae. Cum sociis natoque penatibus et magnis dis parturient. Unam incolunt Belgae, aliam Aquitani, tertiam. Hi omnes lingua, institutis, legibus inter se differunt.</p>
	<ul>
		<li>list item 1</li>
		<li>list item 2</li>
		<li>list item 3</li>
	</ul>
	<p>Curabitur blandit tempus ardua ridiculus sed magna. Quam diu etiam furor iste tuus nos eludet? Curabitur est gravida et libero vitae dictum. Qui ipsorum lingua Celtae, nostra Galli appellantur. Hi omnes lingua, institutis, legibus inter se differunt. Curabitur blandit tempus ardua ridiculus sed magna.</p>
	<p>Hi omnes lingua, institutis, legibus inter se differunt. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Curabitur blandit tempus ardua ridiculus sed magna. Salutantibus vitae elit libero, a pharetra augue.</p>

	<h2>And yet another...</h2>

	<p>Curabitur blandit tempus ardua ridiculus sed magna. Inmensae subtilitatis, obscuris et malesuada fames. Vivamus sagittis lacus vel augue laoreet rutrum faucibus. Unam incolunt Belgae, aliam Aquitani, tertiam. Pellentesque habitant morbi tristique senectus et netus. Qui ipsorum lingua Celtae, nostra Galli appellantur.</p>

</div>
```

Events

```javascript
$('.content')
.on( 'created.magic-tabs', function(e){
	console.log(e.tabs);
})
.on( 'opened.magic-tabs', function(e){
	console.log(e);
})
.on( 'closed.magic-tabs', function(e){
	console.log(e);
});
.magicTabs();
```

Creating Constant Tabs
```javascript
$( '.content' ).magicTabs();
var magicTabs = $( '.content' ).data( 'magic-tabs' );
magicTabs.addTab( function( newTab ) {
	newTab.head = 'Tab Title';
	newTab.contents = '<p>Some tab content</p>';
});
```