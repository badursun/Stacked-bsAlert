# Stacked bsAlert

Stacked bsAlert is a jQuery plugin designed to stack multiple Bootstrap alerts into a neat, visually appealing format. This plugin allows you to configure various options such as the number of visible alerts, z-index start point, and custom classes for alerts.

![sample](https://github.com/badursun/Stacked-bsAlert/assets/5244451/77c76d4f-efae-44ee-ac5a-183ae7ee50ae)


## Features

- Stack multiple Bootstrap alerts in a clean format
- Customize the number of visible alerts
- Set the starting z-index for alerts
- Add custom classes to alerts
- Supports multiple alert groups on the same page
- Bootstrap 4 and 5 compatible

## Installation

Include the necessary CSS and JS files in your HTML:

```html
<!-- Bootstrap -->
<link rel="stylesheet" href="https://your-domain.com/bootstrap.min.css">
<script src="https://your-domain.com/bootstrap.min.js"></script>

<!-- jQuery -->
<script src="https://your-domain.com/jquery.min.js"></script>

<!-- StackedAlert -->
<script src="path/to/StackedAlert.js"></script>
```

## Usage

```html
<div class="alert-group" id="alert-group-q">
	<div class="alert alert-success alert-dismissible fade show">
		...
	</div>
	<div class="alert alert-info alert-dismissible fade show">
		...
	</div>
	<div class="alert alert-danger alert-dismissible fade show">
		...
	</div>
	<div class="alert alert-warning alert-dismissible fade show">
		...
	</div>
</div>

<script>
	$(document).ready(function () {
	    $('#alert-group-1').StackedAlert({
	        visibleAlert    : 2,                // Number of alerts to show in a group
	        startIndex      : 1040,             // Initial index value of alerts in the group
	        appendClass     : 'custom-class',   // Extra class to be added to per alerts
	        stackRange      : 5                 // Spacing between the position of the stacked alerts
	    });

	});
</script>
```
