### A Pluto.jl notebook ###
# v0.10.0

using Markdown

# ╔═╡ b9edbe4d-37fe-4e7f-bf91-232dab4e27b8
begin
    using LinearAlgebra
    using Plots
    using DataFrames, CSV
end

# ╔═╡ ef913691-f672-4d6b-aae0-400443e42018
md"""
## This notebook has strong inspiration from [ISLR-python](https://github.com/JWarmenhoven/ISLR-python/blob/master/Notebooks/Chapter%209.ipynb)
"""

# ╔═╡ 3a17fda5-84ae-403b-9962-b96e4c7e4175
# Figure 9.1
X1 = [-1.5, 1.5]
X2 = [2.0/3.0, -4.0/3.0]
plot(X1, X2, xlabel="X1", ylabel="X2", label="1 + 2 X1 + 3 X2 = 0")

# ╔═╡ e8653abc-79c6-4e64-802f-550c28bf641a
x = randn(20, 2)
labels = repeat([-1, 1], 10)
x[labels .== -1, :] = x[labels .== -1, :] .+ 1

scatter(x[labels .== 1, 1], x[labels .== 1, 2])
scatter!(x[labels .== -1, 1], x[labels .== -1, 2], xlabel="X1", ylabel="X2", legend=false)

# ╔═╡ 799f5e43-ec9f-4579-84a6-5c7dd9748938
function plot_svc(model, x, y, h=0.02, pad=0.25)
    x_min = minimum(x[:, 1]) - pad
    x_max = maximum(x[:, 1]) + pad
    y_min = minimum(x[:, 2]) - pad
    y_max = maximum(x[:, 2]) + pad
    
    xx = x_min:h:x_max
    yy = y_min:h:y_max
    
    f(i, j) = begin 
        c = reshape([i; j], (2, 1))
        pred = svmpredict(model, c) 
#         if pred[2][1] < 0
#             return -1
#         end
#         return 1
        return pred[2][1]
    end
    
#     contour(xx, yy, f, fill = true)
    contour(xx, yy, f, fill = true, colorbar_entry=false, levels=1)
    # use colorbar_entry = false to hide the side color bar
    # levels = 1 means there are only 2 colors for contour plot
    # see more options in src/arg_desc.jl of https://github.com/JuliaPlots/Plots.jl/
end

# ╔═╡ a68836b1-e81c-4f0b-9ad9-0727ada0ff5c
model = svmtrain(x', labels,  kernel=Kernel.Linear);

# ╔═╡ b7dd69ae-69c8-415a-b930-cc1887d1f754
plot_svc(model, x, labels)
scatter!(x[labels .== 1, 1], x[labels .== 1, 2])
scatter!(x[labels .== -1, 1], x[labels .== -1, 2], xlabel="X1", ylabel="X2", legend=false)

# ╔═╡ 7cc67a53-84db-4541-916f-080ae7bf238a
model = svmtrain(x', labels,  kernel=Kernel.Linear, cost=0.1)

plot_svc(model, x, labels)
scatter!(x[labels .== 1, 1], x[labels .== 1, 2])
scatter!(x[labels .== -1, 1], x[labels .== -1, 2], xlabel="X1", ylabel="X2", legend=false)

# ╔═╡ 045ce77d-5135-4bd6-970c-f01ece06df34
x = randn(20, 2);
labels = repeat([-1, 1], 10);
x[labels .== -1, :] = x[labels .== -1, :] .+ 5;

# ╔═╡ 012a4b22-96e0-412b-a08e-81302e24d90f
model = svmtrain(x', labels,  kernel=Kernel.Linear);

# ╔═╡ 06d89197-e178-4663-bf1a-94b5d34f28a1
plot_svc(model, x, labels);
scatter!(x[labels .== 1, 1], x[labels .== 1, 2]);
scatter!(x[labels .== -1, 1], x[labels .== -1, 2], xlabel="X1", ylabel="X2", legend=false)

# ╔═╡ 9ef1f2f0-258a-4b75-8894-449003cbd7a7
md"""
## SVM with non-linear kernel
"""

# ╔═╡ 11270d0a-c91f-4108-ba11-2fb2aaa5eb35
X = randn(2, 200);
X[:, 1:100] = X[:, 1:100] .+ 2;
X[:, 101:150] = X[:, 101:150] .- 2;

labels = vcat(repeat([-1], 150), repeat([1], 50));

# ╔═╡ 30e58c8c-b2db-481d-8a1f-b0b8ac794df8
scatter(X[1, labels .== 1], X[2, labels .== 1])
scatter!(X[1, labels .== -1], X[2, labels .== -1], legend=false)

# ╔═╡ 93e4b2b3-7a99-4c55-94ac-68204fb86ecc
model = svmtrain(X, labels) # default kernel is RadialBasis

plot_svc(model, X', labels)
scatter!(X[1, labels .== 1], X[2, labels .== 1])
scatter!(X[1, labels .== -1], X[2, labels .== -1], legend=false)

# ╔═╡ 80792cbe-7516-4d19-9008-3ddbf1015157
model = svmtrain(X, labels, cost=100.0, gamma=1.0) # default kernel is RadialBasis

plot_svc(model, X', labels)
scatter!(X[1, labels .== 1], X[2, labels .== 1])
scatter!(X[1, labels .== -1], X[2, labels .== -1], legend=false)

# ╔═╡ dd3b9170-aa55-4b4e-b97f-7989077686b3


# ╔═╡ Cell order:
# ╠═b9edbe4d-37fe-4e7f-bf91-232dab4e27b8
# ╟─ef913691-f672-4d6b-aae0-400443e42018
# ╠═3a17fda5-84ae-403b-9962-b96e4c7e4175
# ╠═e8653abc-79c6-4e64-802f-550c28bf641a
# ╠═799f5e43-ec9f-4579-84a6-5c7dd9748938
# ╠═a68836b1-e81c-4f0b-9ad9-0727ada0ff5c
# ╠═b7dd69ae-69c8-415a-b930-cc1887d1f754
# ╠═7cc67a53-84db-4541-916f-080ae7bf238a
# ╠═045ce77d-5135-4bd6-970c-f01ece06df34
# ╠═012a4b22-96e0-412b-a08e-81302e24d90f
# ╠═06d89197-e178-4663-bf1a-94b5d34f28a1
# ╟─9ef1f2f0-258a-4b75-8894-449003cbd7a7
# ╠═11270d0a-c91f-4108-ba11-2fb2aaa5eb35
# ╠═30e58c8c-b2db-481d-8a1f-b0b8ac794df8
# ╠═93e4b2b3-7a99-4c55-94ac-68204fb86ecc
# ╠═80792cbe-7516-4d19-9008-3ddbf1015157
# ╠═dd3b9170-aa55-4b4e-b97f-7989077686b3
