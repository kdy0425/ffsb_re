$("#nav").hover(
    function () { menuFocusOn(); }
  , function () { menuFocusOut(); }
);

// 웹 접근성 보안으로 인하여 탭키 사용시에 하위메뉴 보여주도록 수정
$(".hd_bottom").keyup(function (e) {
	
	if(e.keyCode == '9') {
	
		if($(':focus').prop('tagName') == 'A') {
			menuFocusOn();
		} else {
			menuFocusOut();
		}
	}
});

//nav hover  header 디자인 효과
let bgHeight = 0;

function menuFocusOn() {
	$("#header").addClass("hover");
    $(".sc_form").hide();
    $(".info_ly").hide();
    if(bgHeight == 0){
        $('#nav .in_wrap').each(function(){
            if(bgHeight < $(this).outerHeight()){
                bgHeight = $(this).outerHeight();
            }
        });
        $('.nav_bg').outerHeight(bgHeight + $('#header').outerHeight());
        $('#nav .in_wrap').outerHeight(bgHeight);
    }
};

function menuFocusOut() {
	$("#header").removeClass("hover");
};

$(".btn_search").click(function (event) {
    event.stopPropagation(); 
    $(".info_ly").hide();
    $(".sc_form").show();
});
$(".sc_close").click(function (event) {
    event.stopPropagation(); 
    $(".sc_form").hide();
});
$(document).click(function (event) {
    if ($(event.target).closest(".sc_form").length === 0) {
        if ($(".sc_form:visible").length > 0) {
            $(".sc_form").hide();
        }
    }
});

$(".btn_menuall").click(function (event) {
    if($(this).hasClass('active')){
        $(this).removeClass('active');
        $("#header").removeClass("all");
        $('.nav_all').hide();
        $(this).text('전체메뉴');
    }else{
        $(this).addClass('active');
        $("#header").addClass("all");
        $('.nav_all').show();
        $(this).text('전체메뉴 닫기');
    }
});
$(document).click(function (event) {
    if($(event.target).hasClass("btn_menuall")){
        return ;
    }
    if ($(event.target).closest(".nav_all").length === 0) {
        if ($(".nav_all:visible").length > 0) {
            $(".btn_menuall").removeClass("active");
            $("#header").removeClass("all");
            $(".nav_all").hide();
        }
    }
});

//totop
$(window).scroll(function () {
    var scrollPosition = $(this).scrollTop();
    if (scrollPosition >= 100) {
        $("#to_top").css('opacity', '1')
    } else {
        $("#to_top").css('opacity', '0')
    }
});
//푸터 family sites
$(".family_sites_open").on("click", function(e) {
	e.stopPropagation();
	$(this).toggleClass("active");
	$(".sites").toggle();
});
$(document).on("click", function(event) {
	var $trigger = $(".family_sites");
	if($trigger !== event.target && !$trigger.has(event.target).length) {
		$(".family_sites_open").removeClass("active");
		$(".sites").hide();
	}    
});
$(document).ready(function () {
    var activeItem = null;
    var sectionOffsets = {};

    // 메인 퀵메뉴
    $('.quick_list .item a').each(function () {
        var targetId = $(this).data('rel');
        var targetElement = $('#' + targetId);
        if (targetElement.length > 0) {
            sectionOffsets[targetId] = targetElement.offset().top;
        }
    });

    $(window).scroll(function () {
        var scrollPos = $(window).scrollTop();
        var windowHeight = $(window).height();
        var scrollThreshold = windowHeight / 5; 

        var clickedItem = null;
        for (var targetId in sectionOffsets) {
            var targetOffset = sectionOffsets[targetId];
            if (scrollPos + scrollThreshold >= targetOffset && scrollPos - scrollThreshold < targetOffset) {
                clickedItem = $('.quick_list .item a[data-rel="' + targetId + '"]');
            }
        }
        if (scrollPos <= sectionOffsets["section_01"] + scrollThreshold && activeItem) {
            $('.quick_list .item a').removeClass('active');
            activeItem = null;
        }
        if (scrollPos <= sectionOffsets["section_01"] + scrollThreshold) {
            $('.quick_list .item a[data-rel="section_01"]').addClass('active');
            activeItem = $('.quick_list .item a[data-rel="section_01"]');
        } else {
            if (clickedItem) {
                if (activeItem !== clickedItem) {
                    $('.quick_list .item a').removeClass('active');
                    clickedItem.addClass('active');
                    activeItem = clickedItem;
                }
            }
        }
    });

    // 클릭 이벤트
    $('.quick_list .item a').click(function () {
        var targetId = $(this).data('rel');
        if (targetId == 'section_01') {
            var targetOffset = sectionOffsets[targetId];
        } else {
            var targetOffset = sectionOffsets[targetId] + 60;
        }

        $('.item a').removeClass('active');
        $(this).addClass('active');
        activeItem = this;

        $('html, body').animate(
            {
                scrollTop: targetOffset,
            },
            500 
        );
    });
});


//접근성 탭 포커스 
function trapFocus(popup) {
    var focusableElements = popup.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    var firstFocusableElement = focusableElements[0];  
    var lastFocusableElement = focusableElements[focusableElements.length - 1]; 

    popup.addEventListener('keydown', function(e) {
        var isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

        if (!isTabPressed) {
            return;
        }

        if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
                e.preventDefault();
                lastFocusableElement.focus();
            }
        } else {
            if (document.activeElement === lastFocusableElement) {
                e.preventDefault();
                firstFocusableElement.focus();
            }
        }
    });
}

//레이어팝업 오픈 히든
let layerOpenButton = null;
function layerOpen(button, target){
    var popup = document.querySelector(target);
    popup.classList.remove('dns');
    popup.focus();
    popup.focus();
    trapFocus(popup);
    layerOpenButton = button; //버튼 눌러 레이어 열었을때 버튼 메모리
}
function layerClose(button) {
    var popup = button.closest('.pops1');
    popup.classList.add('dns');
    if(layerOpenButton != null){
        layerOpenButton.focus(); //열었던 버튼 포커스로 되돌림  (접근성)
    }
}


//첨부파일
function initFileInput() {
    document.querySelectorAll('.file_input').forEach(function (fileInput) {
        const fileInputField = fileInput.querySelector('input[type="file"]');
        const textInput = fileInput.querySelector('input[type="text"]');
        const removeButton = fileInput.querySelector('.remove_file');
        const sizeInMB = parseInt(fileInputField.getAttribute('size'), 10);
        const maxFileSize = sizeInMB * 1024 * 1024;
        const allowedExtensions = fileInputField.getAttribute('accept')
            .split(',')
            .map(ext => ext.trim().replace('.', '').toLowerCase());

        fileInputField.addEventListener('change', function () {
            const file = fileInputField.files[0];

            if (file) {
                const fileSize = file.size;
                const fileExtension = file.name.split('.').pop().toLowerCase();

                if (!allowedExtensions.includes(fileExtension)) {
                    alert("허용되지 않는 파일 형식입니다. " + allowedExtensions.join(', ') + " 파일만 업로드 가능합니다.");
                    fileInputField.value = ''; 
                    textInput.value = '';
                    return;
                }
                if (fileSize > maxFileSize) {
                    alert("파일 용량이 " + sizeInMB + "MB를 초과했습니다.");
                    fileInputField.value = '';
                    textInput.value = '';
                    return;
                }
                textInput.value = file.name;
                removeButton.classList.add('active');
            }
        });

        removeButton.addEventListener('click', function () {
            fileInputField.value = '';
            textInput.value = '';
            removeButton.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    initFileInput();
});