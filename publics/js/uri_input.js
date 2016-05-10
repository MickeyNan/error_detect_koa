$(document).ready(function(){
	$("#inspector").click(function (){
		var inputurl = $("#url").val();
		if(validateURL(url)){
			$.ajax({
				url: "/uri",
				type: "post",
				dataType: "json",
				data: {
					uri: inputurl
				},
				success: function(result){
					if (result && result.status && result.status == 200){
						location.href = "/result" + "?" + "referer=" + inputurl;
					} else {
						alert("服务器错误，稍后再试");
					}
				},
				error: function(err){
					 console.log(err);
					 alert("服务器错误，稍后再试");
				}

			});
		}
	});



	function validateURL(url){
		if (!url){
			alert("请输入url");
			return false;
		}

		return true;
	}
});